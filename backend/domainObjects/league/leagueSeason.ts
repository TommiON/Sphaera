import League from "./league";
import Match from "../match/match";
import Club from "../club/club";
import Standing from "./standing";
import gameParameters from "../../domainProperties/gameParameters";
import { generateFixtures } from "../../domainEngine/league/fixtureGenerator";

export default class LeagueSeason {
    division: number;
    ordinal: number;
    teams: Club[];
    //standings: Standing[];
    matches: Match[];
    started: boolean;
    finished: boolean;

    constructor(participants: Club[], seasonNumber: number, divisionNumber: number) {
        if (participants.length !== gameParameters.LEAGUE_NUMBER_OF_TEAMS) return; // virheenkäsittelyt paremmiksi poikkeuksilla

        this.teams = participants;
        this.matches = generateFixtures(this.teams);
        this.ordinal = seasonNumber;
        this.division = divisionNumber;
        this.started = true;
        this.finished = false;
    }

    /*
    getStandings = (): Standing[] => {
        
    }
    */
} 