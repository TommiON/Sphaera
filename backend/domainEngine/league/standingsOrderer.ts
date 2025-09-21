import Standing from "../../domainObjects/league/standing"

// toteutus: ei ylläpidetä sijoituksia entitynä, lasketaan LeagueSeasonin Matcheista aina kun tarvitaan?
export const compareStandings = (a: Standing, b: Standing): number => {
    if (a.points !== b.points) {
        return b.points - a.points;
    }

    return 0;
}