import Club from "../club/club";
import MatchEvent from "./matchEvent";

export default class Match {
    homeTeam: Club;
    awayTeam: Club;
    week: number;
    started: boolean = false;
    ended: boolean = false;
    //events: MatchEvent[] = [];
}