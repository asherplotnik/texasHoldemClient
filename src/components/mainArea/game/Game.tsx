import { useCallback, useEffect, useState } from "react";
import GameModel from "../../../models/GameModel";
import globals from "../../../services/Globals";
import jwtAxios from "../../../services/jwtAxios";
import "./Game.css";
import { updateAuthAction } from "../../../redux/AuthState";
import Community from "./tableComponents/community/Community";
import store from "../../../redux/Store";
import PlayerModel from "../../../models/PlayerModel";
import TablePlayer from "./tableComponents/tablePlayer/TablePlayer";
import InnerTablePlayer from "./tableComponents/innerTablePlayer/InnerTablePlayer";
import { PlayEnum } from "../../../models/PlayEnum";
import Play from "./tableComponents/play/Play";
import { StatusEnum } from "../../../models/StatusEnum";
//import { Button } from "@material-ui/core";

function Game(): JSX.Element {
  const [gameState, setGameState] = useState<GameModel>();
  const [playersArr, setPlayersArr] = useState<PlayerModel[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [plays, setPlays] = useState<PlayEnum[]>([]);
  const checkPlays = useCallback((game: GameModel) => {
    if (game) {
      const player = game.players.find(
        (player) => player.id === store.getState().AuthState.auth.id
      );
      const playerTurn = game?.players?.find(
        (player) => player.id === game?.activePlayers[game?.playerTurn]
      )?.id;
      if (
        player.id !== playerTurn ||
        player.lastAct === PlayEnum.FOLD ||
        game.status === StatusEnum.WAITING
      ) {
        setPlays([]);
      } else {
        switch (game.lastPlay) {
          case PlayEnum.CHECK:
            setPlays([PlayEnum.FOLD, PlayEnum.BET, PlayEnum.CHECK]);
            break;
          case PlayEnum.BET:
          case PlayEnum.RAISE:
          case PlayEnum.CALL:
            setPlays([PlayEnum.FOLD, PlayEnum.CALL, PlayEnum.RAISE]);
            break;
        }
      }
    }
  }, []);

  const pingGame = useCallback(() => {
    jwtAxios
      .get<GameModel>(globals.urls.localUrl + "api/game/pingGame")
      .then((response) => {
        setGameState(response.data);
        setPlayersArr(arrangePlayers(response.data.players));
        checkPlays(response.data);
        const wallet = response.data.players.find(
          (player) => player.id === store.getState().AuthState.auth.id
        ).wallet;
        store.dispatch(updateAuthAction(wallet));
      });
  }, [checkPlays]);

  useEffect(() => {
    pingGame();
    let ping = setInterval(() => {
      pingGame();
    }, 3000);
    return () => {
      clearInterval(ping);
    };
  }, [pingGame]);

  const arrangePlayers = (players: PlayerModel[]): PlayerModel[] => {
    const arr: PlayerModel[] = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    let myPosition = players.findIndex(
      (player) => player.id === store.getState().AuthState.auth.id
    );
    for (let i = 0; i < players.length - myPosition; i++) {
      if (players[myPosition + i]) {
        arr[i] = new PlayerModel();
        arr[i].id = players[myPosition + i].id;
        arr[i].name = players[myPosition + i].name;
        arr[i].lastAct = players[myPosition + i].lastAct;
        arr[i].lastAmount = players[myPosition + i].lastAmount;
        arr[i].wallet = players[myPosition + i].wallet;
        arr[i].winner = players[myPosition + i].winner;
        arr[i].card1 = players[myPosition + i].card1;
        arr[i].card2 = players[myPosition + i].card2;
      }
    }
    for (let i = 0; i < myPosition; i++) {
      arr[10 - myPosition + i] = new PlayerModel();
      arr[10 - myPosition + i].id = players[i].id;
      arr[10 - myPosition + i].name = players[i].name;
      arr[10 - myPosition + i].lastAct = players[i].lastAct;
      arr[10 - myPosition + i].lastAmount = players[i].lastAmount;
      arr[10 - myPosition + i].wallet = players[i].wallet;
      arr[10 - myPosition + i].winner = players[i].winner;
      arr[10 - myPosition + i].card1 = players[i].card1;
      arr[10 - myPosition + i].card2 = players[i].card2;
    }

    return arr;
  };
  const checkTurn = (player: PlayerModel): string => {
    if (player?.id === gameState?.activePlayers[gameState?.playerTurn])
      return " Turn";
    return "";
  };

  const checkDealer = (): number => {
    let myPosition = gameState?.players?.findIndex(
      (player) => player.id === store.getState().AuthState.auth.id
    );
    if (gameState?.dealer >= myPosition) {
      return gameState?.dealer - myPosition;
    }
    if (gameState?.dealer < myPosition) {
      return 10 - myPosition + gameState?.dealer;
    }
  };
  let arrangedDealer = checkDealer();
  return (
    <div className="Game">
      <div className="PotDiv">POT: {gameState?.pot}</div>
      {/* <Button variant="contained" onClick={pingGame}>ping</Button> */}
      <div className="Table">
        <div className="TablePosition1">
          <InnerTablePlayer
            myPosition={0}
            dealer={arrangedDealer}
            player={playersArr[0]}
            position="CenterDown"
          />
        </div>
        <div className="TablePosition2">
          <InnerTablePlayer
            myPosition={1}
            dealer={arrangedDealer}
            player={playersArr[1]}
            position="CenterDown"
          />
        </div>
        <div className="TablePosition3">
          <InnerTablePlayer
            myPosition={2}
            dealer={arrangedDealer}
            player={playersArr[2]}
            position="Left"
          />
        </div>
        <div className="TablePosition4">
          <InnerTablePlayer
            myPosition={3}
            dealer={arrangedDealer}
            player={playersArr[3]}
            position="Left"
          />
        </div>
        <div className="TablePosition5">
          <InnerTablePlayer
            myPosition={4}
            dealer={arrangedDealer}
            player={playersArr[4]}
            position="CenterUp"
          />
        </div>
        <div className="TablePosition6">
          <InnerTablePlayer
            myPosition={5}
            dealer={arrangedDealer}
            player={playersArr[5]}
            position="CenterUp"
          />
        </div>
        <div className="TablePosition7">
          <InnerTablePlayer
            myPosition={6}
            dealer={arrangedDealer}
            player={playersArr[6]}
            position="CenterUp"
          />
        </div>
        <div className="TablePosition8">
          <InnerTablePlayer
            myPosition={7}
            dealer={arrangedDealer}
            player={playersArr[7]}
            position="Right"
          />
        </div>
        <div className="TablePosition9">
          <InnerTablePlayer
            myPosition={8}
            dealer={arrangedDealer}
            player={playersArr[8]}
            position="Right"
          />
        </div>
        <div className="TablePosition10">
          <InnerTablePlayer
            myPosition={9}
            dealer={arrangedDealer}
            player={playersArr[9]}
            position="CenterDown"
          />
        </div>
        {gameState && <Community cards={gameState.flop} />}
      </div>
      <div className={"Position1" + checkTurn(playersArr[0])}>
        <TablePlayer player={playersArr[0]} />
      </div>
      <div className={"Position2" + checkTurn(playersArr[1])}>
        <TablePlayer player={playersArr[1]} />
      </div>
      <div className={"Position3" + checkTurn(playersArr[2])}>
        <div className="PositionUpRight">
          <TablePlayer player={playersArr[2]} />
        </div>
      </div>
      <div className={"Position4" + checkTurn(playersArr[3])}>
        <div className="PositionDownRight">
          <TablePlayer player={playersArr[3]} />
        </div>
      </div>
      <div className={"Position5" + checkTurn(playersArr[4])}>
        <div className="PositionDown">
          <TablePlayer player={playersArr[4]} />
        </div>
      </div>
      <div className={"Position6" + checkTurn(playersArr[5])}>
        <div className="PositionDown">
          <TablePlayer player={playersArr[5]} />
        </div>
      </div>
      <div className={"Position7" + checkTurn(playersArr[6])}>
        <div className="PositionDown">
          <TablePlayer player={playersArr[6]} />
        </div>
      </div>
      <div className={"Position8" + checkTurn(playersArr[7])}>
        <div className="PositionDownLeft">
          <TablePlayer player={playersArr[7]} />
        </div>
      </div>
      <div className={"Position9" + checkTurn(playersArr[8])}>
        <div className="PositionUpLeft">
          <TablePlayer player={playersArr[8]} />
        </div>
      </div>
      <div className={"Position10" + checkTurn(playersArr[9])}>
        <TablePlayer player={playersArr[9]} />
      </div>
      <div className="Play">
        <Play game={gameState} plays={plays} ping={pingGame} />
      </div>
    </div>
  );
}

export default Game;
