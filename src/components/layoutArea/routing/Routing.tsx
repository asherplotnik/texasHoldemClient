import { Redirect, Route, Switch } from "react-router-dom";
import CreateGame from "../../mainArea/createGame/CreateGame";
import Game from "../../mainArea/game/Game";
import JoinGame from "../../mainArea/joinGame/JoinGame";
import Login from "../../mainArea/login/Login";
import SignUp from "../../mainArea/signUp/SignUp";
import Page404 from "../../page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/signUp" component={SignUp} exact />
            <Route path="/join" component={JoinGame} exact />
            <Route path="/create" component={CreateGame} exact />
            <Route path="/game/:game" component={Game} exact />
            <Redirect from="/" to="/login" exact />
            <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
