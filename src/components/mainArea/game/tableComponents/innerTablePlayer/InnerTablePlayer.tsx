import PlayerModel from "../../../../../models/PlayerModel";
import "./InnerTablePlayer.css";
import Dealer from "../../tableComponents/dealer/Dealer";
import SmallBlind from "../../tableComponents/smallBlind/SmallBlind";
import BigBlind from "../../tableComponents/bigBlind/BigBlind";
interface PlayerProps {
  player: PlayerModel;
  position: string;
  dealer: number;
  myPosition: number;
}

function InnerTablePlayer(props: PlayerProps): JSX.Element {
  let smallBlind;
  let bigBlind;
  if (props.dealer < 8) {
    smallBlind = props.dealer + 1;
    bigBlind = props.dealer + 2;
  } else if (props.dealer === 8) {
    smallBlind = 9;
    bigBlind = 0;
  } else if (props.dealer === 9) {
    smallBlind = 0;
    bigBlind = 1;
  }
  let isSmallBlind = props.myPosition === smallBlind;
  let isDealer = props.myPosition === props.dealer;
  let isBigBlind = props.myPosition === bigBlind;
  if (props.player) {
    return (
      <div className="InnerTablePlayer">
        <div className={props.position}>
          <div className="Role">
            <div>
              {isDealer && <Dealer />}
              {isSmallBlind && <SmallBlind />}
              {isBigBlind && <BigBlind />}
            </div>
            {"\u00A0"}
            <div>
              <div>{props.player.lastAmount}</div>
              {props.player?.winner ? (
                <div className="Winner">WINNER</div>
              ) : (
                <div>{props.player.lastAct}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default InnerTablePlayer;
