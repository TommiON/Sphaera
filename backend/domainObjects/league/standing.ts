import Club from "../club/club";

export default interface Standing {
    team: Club;

    // tarvittaneen myös viikon numero?
    // tämänhetkinen LeagueSeasonin tilanne: max(viikkonumerot) ja sitten standingsOrderer
    // mikä tahansa aiempi tilanne: viikkonumero ja sitten standingsOrderer

    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}