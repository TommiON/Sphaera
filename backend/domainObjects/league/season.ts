import League from "./league";
import Match from "../match/match";
import Standing from "./standing";

export default class Season {
    league: League;
    ordinal: number;
    standings: Standing[];
    fixtures: Match[];
}