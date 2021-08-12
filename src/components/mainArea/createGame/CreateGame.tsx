import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import GameModel from "../../../models/GameModel";
import { errorAlert } from "../../../services/commonFunctionService";
import globals from "../../../services/Globals";
import jwtAxios from "../../../services/jwtAxios";
import "./CreateGame.css";

const useStyles = makeStyles({
    textfieldInput: {
      color: "lightGray",
    },
    buttonStyle : {textTransform: 'lowercase'}
  });
  

function CreateGame(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
  } = useForm<GameModel>();
  const createGame = (data: GameModel) => {
      jwtAxios.post(globals.urls.localUrl+"api/game/createGame",data)
      .then((response)=>{
        history.push("/game/"+data.name)
      })
      .catch((error)=>{
        errorAlert(error);
      })
  };
  return (
    <div className="CreateGame">
      <form onSubmit={handleSubmit(createGame)} className="CreateGameForm">
        <Typography variant="h5" component="h1">
          Create Game
        </Typography>
        <TextField
          InputLabelProps={{
            className: classes.textfieldInput,
          }}
          InputProps={{
            className: classes.textfieldInput,
          }}
          name="name"
          {...register("name")}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="name"
          type="text"
          autoFocus
        />
        <TextField
          InputLabelProps={{
            className: classes.textfieldInput,
            
          }}
          InputProps={{
            className: classes.textfieldInput,
            inputProps: { min: 10, max: 100, step: 10 }
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Small Blind"
          type="number"
          name="smallBlindBet"
          {...register("smallBlindBet")}
          />
        <br />
        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateGame;
