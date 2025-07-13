import Club from "../../domainObjects/club/club"
import Match from "../../domainObjects/match/match"
import { isEven, getEverySecondElementFromList } from "../../utils/generalHelperFunctions";
import { shuffleCollectionRandomly, getRandomElement, getRandomElementFromSet } from "../../utils/randomizer";

export const generateFixtures = (teams: Club[]): Match[] => {
    let fixtures: Match[] = [];
    
    const matchesPerRound = teams.length / 2;
    const rounds = (teams.length - 1) * 2;
    const totalMatches = matchesPerRound * rounds;

    while(fixtures.length < totalMatches) {
        let homeCandidates = new Set(teams);
        let awayCandidates = new Set(teams);

        // arvotaan otteluparit kierros kerrallaan
        while(homeCandidates.size > 0 && awayCandidates.size > 0) {
            const hometeam = getRandomElementFromSet(homeCandidates);
            
            homeCandidates.delete(hometeam);
            awayCandidates.delete(hometeam);

            const previousOpponentsForThisHomeTeam = fixtures
                .filter(f => f.homeTeam.name === hometeam.name)
                .map(t => t.awayTeam);

            previousOpponentsForThisHomeTeam
                .forEach(o => awayCandidates.delete(o));

            const awayteam = getRandomElementFromSet(awayCandidates);

            previousOpponentsForThisHomeTeam
                .forEach(o => awayCandidates.add(o));

            if(awayteam) {
                // sopiva pari löytyi, luodaan ottelu
                const fixture = new Match();
                fixture.homeTeam = hometeam;
                fixture.awayTeam = awayteam;
                fixtures.push(fixture);

                homeCandidates.delete(awayteam);
                awayCandidates.delete(awayteam);
            } else {
                // sopivaa paria ei löytynyt, arvotaan uudelleen
                awayCandidates.add(hometeam);
            }
        }
    }

    return fixtures;
}