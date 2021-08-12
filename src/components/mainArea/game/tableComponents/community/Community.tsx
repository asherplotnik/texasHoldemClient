import { CardEnum } from "../../../../../models/CardEnum";
import "./Community.css";
import getLocalCardImage from "../../../../../services/getLocalCardImage";
interface CommunityProps {
    cards: CardEnum[];
}

function Community(props:CommunityProps): JSX.Element {
    let cardClass = "CardClass"
    return (
        <div className="Community">
			{props.cards[0] && <div className={cardClass}><img alt={props?.cards[0]} src={getLocalCardImage(props?.cards[0])} /></div>}
			{props.cards[1] && <div className={cardClass}><img alt={props?.cards[1]} src={getLocalCardImage(props?.cards[1])} /></div>}
			{props.cards[2] && <div className={cardClass}><img alt={props?.cards[2]} src={getLocalCardImage(props?.cards[2])} /></div>}
			{props.cards[3] && <div className={cardClass}><img alt={props?.cards[3]} src={getLocalCardImage(props?.cards[3])} /></div>}
			{props.cards[4] && <div className={cardClass}><img alt={props?.cards[4]} src={getLocalCardImage(props?.cards[4])} /></div>}		
        </div>
    );
}

export default Community;
