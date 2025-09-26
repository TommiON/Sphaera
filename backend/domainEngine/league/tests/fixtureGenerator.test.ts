import { generateFixtures } from "../fixtureGenerator";
import { getRandomElement } from "../../../utils/randomizer";
import Club from "../../../domainObjects/club/club";
import Match from "../../../domainObjects/match/match";

//const NUMBER_OF_TEST_TEAMS = 8;
const NUMBER_OF_TEST_TEAMS = 20;
const NUMBER_OF_MATCHES_PER_ROUND = NUMBER_OF_TEST_TEAMS / 2;
const NUMBER_OF_ROUNDS = (NUMBER_OF_TEST_TEAMS - 1) * 2;
const NUMBER_OF_HOMEGAMES_PER_TEAM = NUMBER_OF_ROUNDS / 2;
const NUMBER_OF_AWAYGAMES_PER_TEAM = NUMBER_OF_HOMEGAMES_PER_TEAM;

test('domain engine / generate fixtures', () => {
    // WHEN: fixtures generated
    const fixtures: Match[] = generateFixtures(getTestTeams());
    //printByRounds(fixtures);

     // THEN: total number of games is correct
    expect(fixtures.length).toEqual(NUMBER_OF_MATCHES_PER_ROUND * NUMBER_OF_ROUNDS);

    // AND: number of home & away games for a team is correct
    const homeGamesForFCTesti1 = fixtures.filter(f => f.homeTeam.name === 'FC Testi 1');
    const awayGamesForFCTesti1 = fixtures.filter(f => f.awayTeam.name === 'FC Testi 1');
    expect(homeGamesForFCTesti1.length).toEqual(awayGamesForFCTesti1.length);
    expect(homeGamesForFCTesti1.length).toEqual(NUMBER_OF_HOMEGAMES_PER_TEAM);
    expect(awayGamesForFCTesti1.length).toEqual(NUMBER_OF_AWAYGAMES_PER_TEAM);

    // AND: a team has exactly one home & one away game against an opponent
    const FCTesti1vsFCTesti2 = fixtures.filter(f => f.homeTeam.name === 'FC Testi 1' && f.awayTeam.name === 'FC Testi 2');
    expect(FCTesti1vsFCTesti2.length).toBe(1);
    const FCTesti2vsFCTesti1 = fixtures.filter(f => f.homeTeam.name === 'FC Testi 2' && f.awayTeam.name === 'FC Testi 1');
    expect(FCTesti2vsFCTesti1.length).toBe(1);

    // AND: a randomly picked match exists only once
    let randomMatch = getRandomElement(fixtures);
    let randomMatchPresence = fixtures.filter(f =>
        f.homeTeam.name === randomMatch.homeTeam.name && f.awayTeam.name === randomMatch.awayTeam.name);
    expect(randomMatchPresence.length).toBe(1);

    randomMatch = getRandomElement(fixtures);
    randomMatchPresence = fixtures.filter(f =>
        f.homeTeam.name === randomMatch.homeTeam.name && f.awayTeam.name === randomMatch.awayTeam.name);
    expect(randomMatchPresence.length).toBe(1);

    // AND: a team has no match against itself
    const FCTesti1AgainstItself = fixtures.filter(f => f.homeTeam.name === 'FC Testi 1' && f.awayTeam.name === 'FC Testi 1');
    expect(FCTesti1AgainstItself.length).toBe(0);
})

const getTestTeams = (): Club[] => {
    let teams: Club[] = [];
    for (let i = 1; i <= NUMBER_OF_TEST_TEAMS; i++) {
        teams.push({
            name: `FC Testi ${i}`,
            established: new Date()
        });
    }

    return teams;
}

const printByRounds = (fixtures: Match[]) => {
    let startIndex = 0;

    console.log('Joukkueita', getTestTeams().length)
    console.log('Kierroksia', NUMBER_OF_ROUNDS)
    console.log('Otteluita yhteensä', fixtures.length)

    for (let round = 1; round <= NUMBER_OF_ROUNDS; round++) {
        fixtures.slice(startIndex, startIndex + NUMBER_OF_MATCHES_PER_ROUND).forEach(fixture =>
            console.log(fixture.homeTeam.name, 'vs', fixture.awayTeam.name, 'viikolla', fixture.weekNumber)
        );
        
        startIndex += NUMBER_OF_MATCHES_PER_ROUND;
    }    
}