import Club from "../club/club";
import MatchEvent from "./matchEvent";

export default class Match {
    homeTeam: Club;
    awayTeam: Club;
    weekNumber: number;
    started: boolean = false;
    ended: boolean = false;
    events: MatchEvent[] = [];

    // suorituskykysyistä myös lopputulos suoraan tähän, vaikka voitaisiinkin laksea MatchEventeistä?
}