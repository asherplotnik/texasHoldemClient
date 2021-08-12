import PlayerModel from "../../../../../models/PlayerModel";
import getLocalCardImage from "../../../../../services/getLocalCardImage";
import "./TablePlayer.css";
interface PlayerProps {
  player: PlayerModel;
}

function TablePlayer(props: PlayerProps): JSX.Element {
  if (props.player) {
    return (
      <div className="TablePlayer">
        <div>{props.player.name}</div>
        <div>{props.player.wallet}</div>
        <div className="CardsDiv">
          {props.player.card1 && <div className="CardClass"><img alt={props.player.card1} src={getLocalCardImage(props.player.card1)} /></div>}
          {props.player.card1 && <div className="CardClass"><img alt={props.player.card2} src={getLocalCardImage(props.player.card2)} /></div>}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default TablePlayer;
