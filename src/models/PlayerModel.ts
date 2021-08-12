import { PlayEnum } from './PlayEnum';
import { CardEnum } from './CardEnum';
class PlayerModel {

    public id : number;
    public wallet : number;
    public name : string;
    public email : string;
    public password : string;
    public card1 : CardEnum;
    public card2 : CardEnum;
    public lastAct : PlayEnum;
    public compareString :string;
    public lastAmount : number;
    public winner : boolean;
    public isAllowReveal : boolean;

}

export default PlayerModel;