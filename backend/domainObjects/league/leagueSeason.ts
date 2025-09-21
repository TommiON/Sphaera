import League from "./league";
import Match from "../match/match";
import Club from "../club/club";
import Standing from "./standing";
import gameParameters from "../../domainProperties/gameParameters";
import { generateFixtures } from "../../domainEngine/league/fixtureGenerator";

export default class LeagueSeason {
    league: League;
    ordinal: number;
    standings: Standing[];
    fixtures: Match[];
    started: boolean = false;
    finished: boolean = false;

    constructor(participants: Club[]) {
        if (participants.length !== gameParameters.LEAGUE_NUMBER_OF_TEAMS) return;

        participants.forEach(participant => {
            this.standings.push({
                team: participant,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                points: 0
            })
        });

        this.fixtures = generateFixtures(participants);

        this.started = true;
    }
} 