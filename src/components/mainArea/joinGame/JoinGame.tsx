import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { errorAlert } from "../../../services/commonFunctionService";
import globals from "../../../services/Globals";
import jwtAxios from "../../../services/jwtAxios";
import "./JoinGame.css";

function JoinGame(): JSX.Element {
    const [games, setGames] = useState<string[]>();
    const history = useHistory();
    const handleCreate = () => {
        history.push("/create");
    }
    const handleJoin = (game:string) => {
        jwtAxios.post<string[]>(globals.urls.localUrl+"api/game/join/"+game)
        .then((response)=>{
            history.push("/game/"+game)
        })
        .catch((error)=>{
            errorAlert(error);
        })
    }
    const fetchOpenGames = () =>{
        jwtAxios.get<string[]>(globals.urls.localUrl+"/api/game/getOpenGames")
        .then((response)=>{
            setGames(response.data);
        })
        .catch((error)=>{
            errorAlert(error);
        })
    }
    
    useEffect(()=>{
        fetchOpenGames();
    },[])

    return (
        <>
		<Typography variant="h5" component="h1">Select a game</Typography>
        <br/>
        <div className="JoinGame">
            {games && games.map((game,index)=>{
                return (
                    <div key={index} onClick={()=>handleJoin(game)} className="GameClass Box">
                        {game}
                    </div>
                )
            })}
            <div onClick={()=>handleCreate()} className="CreateClass Box">
                Create New Game
            </div>
        </div>
        </>
    );
}

export default JoinGame;
