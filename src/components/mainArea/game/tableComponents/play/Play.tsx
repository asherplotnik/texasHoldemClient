import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import GameModel from "../../../../../models/GameModel";
import { PlayEnum } from "../../../../../models/PlayEnum";
import store from "../../../../../redux/Store";
import { leaveAction } from "../../../../../redux/AuthState";
import { errorAlert } from "../../../../../services/commonFunctionService";
import globals from "../../../../../services/Globals";
import jwtAxios from "../../../../../services/jwtAxios";
import "./Play.css";

interface PlayProps {
  game: GameModel;
  plays: PlayEnum[];
  ping: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(3),
    },
  })
);

function Play(props: PlayProps): JSX.Element {
  const classes = useStyles();
  const history = useHistory();

  const handleLeave = () => {
    jwtAxios
      .post(globals.urls.localUrl + "api/game/leave/" + props.game?.name)
      .then(() => {
        store.dispatch(leaveAction());
        history.push("/join");
      })
      .catch((error) => {
        errorAlert(error);
      });
  };

  const handleFold = () => {
    jwtAxios
      .post(globals.urls.localUrl + "api/game/play/FOLD/-1")
      .then((response) => {
        props.ping();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleCall = () => {
    const lastRaised = props.game.players.find(
      (player) => player.id === props.game.activePlayers[props.game.lastRaised]
    );
    const amount = lastRaised.lastAmount;
    jwtAxios
      .post(
        globals.urls.localUrl + "api/game/play/" + PlayEnum.CALL + "/" + amount
      )
      .then((response) => {
        props.ping();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleCheck = () => {
    jwtAxios
      .post(globals.urls.localUrl + "api/game/play/" + PlayEnum.CHECK + "/0")
      .then((response) => {
        props.ping();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleBet = (e: ChangeEvent<{ value: unknown }>) => {
    e.preventDefault();
    const playerWallet = props.game.players.find(
      (player) => player.id === store.getState().AuthState.auth.id
    ).wallet;
    if (playerWallet < parseInt(e.target.value as string)) {
      alert("amount not enough");
      return;
    }
    jwtAxios
      .post(globals.urls.localUrl + "api/game/play/BET/" + e.target.value)
      .then((response) => {
        props.ping();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleRaise = (e: ChangeEvent<{ value: unknown }>) => {
    e.preventDefault();
    const playerLastRaisedId = props.game.activePlayers[props.game.lastRaised];
    const player = props.game.players.find(
      (player) => player.id === playerLastRaisedId
    );
    const amount = player?.lastAmount;
    const playerWallet = props.game.players.find(
      (player) => player.id === store.getState().AuthState.auth.id
    ).wallet;
    if (playerWallet < parseInt(e.target.value as string) + amount) {
      alert("amount not enough");
      return;
    }
    jwtAxios
      .post(
        globals.urls.localUrl +
          "api/game/play/RAISE/" +
          (parseInt(e.target.value as string) + amount)
      )
      .then((response) => {
        props.ping();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleStart = () => {
    jwtAxios
      .post(globals.urls.localUrl + "api/game/startGame/" + props.game.name)
      .then((response) => {
        props.ping();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const startGame =
    props.game?.admin === store.getState().AuthState.auth.id &&
    props.game?.status.toString() === "WAITING";

  return (
    <div className="Play">
      {startGame && (
        <Button
          color="primary"
          variant="contained"
          onClick={handleStart}
          disabled={props.game.players?.length < 2}
        >
          Start Game
        </Button>
      )}
      <Button variant="contained" onClick={handleLeave}>
        Leave Game
      </Button>
      {props.plays.includes(PlayEnum.CHECK) && (
        <Button variant="contained" onClick={handleCheck}>
          Check
        </Button>
      )}
      {props.plays.includes(PlayEnum.FOLD) && (
        <Button variant="contained" onClick={handleFold}>
          Fold
        </Button>
      )}
      {props.plays.includes(PlayEnum.CALL) && (
        <Button variant="contained" onClick={handleCall}>
          Call
        </Button>
      )}
      {props.plays.includes(PlayEnum.BET) && (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="bet-simple-select-outlined-label">Bet</InputLabel>
          <Select
            labelId="bet-simple-select-outlined-label"
            id="bet-simple-select-outlined"
            onChange={handleBet}
            label="Bet"
            margin="dense"
          >
            <MenuItem key="10" value={10}>
              10
            </MenuItem>
            <MenuItem key="20" value={20}>
              20
            </MenuItem>
            <MenuItem key="30" value={30}>
              30
            </MenuItem>
            <MenuItem key="40" value={40}>
              40
            </MenuItem>
            <MenuItem key="50" value={50}>
              50
            </MenuItem>
            <MenuItem key="100" value={100}>
              100
            </MenuItem>
            <MenuItem key="-1" value={-1}>
              ALL IN
            </MenuItem>
          </Select>
        </FormControl>
      )}
      {props.plays.includes(PlayEnum.RAISE) && (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="raise-simple-select-outlined-label">Raise</InputLabel>
          <Select
            labelId="raise-simple-select-outlined-label"
            id="raise-simple-select-outlined"
            onChange={handleRaise}
            label="Raise"
            margin="dense"
          >
            <MenuItem key="10" value={10}>
              10
            </MenuItem>
            <MenuItem key="20" value={20}>
              20
            </MenuItem>
            <MenuItem key="30" value={30}>
              30
            </MenuItem>
            <MenuItem key="40" value={40}>
              40
            </MenuItem>
            <MenuItem key="50" value={50}>
              50
            </MenuItem>
            <MenuItem key="100" value={100}>
              100
            </MenuItem>
            <MenuItem key="-1" value={-1}>
              ALL IN
            </MenuItem>
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default Play;
