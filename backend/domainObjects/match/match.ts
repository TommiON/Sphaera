import Club from "../club/club";
import MatchEvent from "./matchEvent";

export default class Match {
    homeTeam: Club;
    awayTeam: Club;
    startTime: Date;
    started: boolean;
    ended: boolean;
    event: MatchEvent[];
}