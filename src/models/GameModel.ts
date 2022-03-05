import { PlayEnum } from './PlayEnum';
import { StatusEnum } from './StatusEnum';
import { CardEnum } from './CardEnum';
import PlayerModel from './PlayerModel';
class GameModel {
	public id : number;
	public admin :number;
	public name : string;
	public start : Date;
	public end : Date;
	public status : StatusEnum;
	public pot : number;
	public players : PlayerModel[];
	public activePlayers : number[];
	public flop : CardEnum[];
	public playerTurn : number;
	public dealer : number;
	public lastPlay : PlayEnum;
	public lastRaised : number;
	public smallBlindBet: number;
	public bigBlind: number;
}

export default GameModel;