import Club from "../../domainObjects/club/club";
import LeagueSeason from "../../domainObjects/league/leagueSeason";
import { clubRepository, leagueSeasonRepository } from "../../repositories/repositories";
import { generateFixtures } from "../league/fixtureGenerator";

export const organizeNewSeason = async (seasonNumber: number) => {
    /* 
    - edellisen kauden putoamiset ja promootiot
    - edellisten wind-down (finished=true jossain)
    - uusien seurojen hakeminen reserviliigasta
    - tarvittaessa sarjapyramidin kasvattaminen (myös kutistaminen?) 
    - tarvittaessa auto-joukkueiden luominen
    - huom: nyt ei synkassa timekeeper-maailman kanssa, uudelleenkäynnistys luo aina uudet leagueseasonit
    */
    const clubsWithoutLeague = await findNonAttachedClubs();
    console.log('ORGANISAATTORI, sijoittamattomat: ', clubsWithoutLeague);
    const precedingLeagueSeasons = await findPrecedingLeagueSeasons(seasonNumber);
    console.log('ORGANISAATTORI, edeltävät kaudet:', precedingLeagueSeasons);

    const tiimit = await temporaryTeamGetter();
    await createLeagueSeason(tiimit, seasonNumber);
}

const createLeagueSeason = async(teams: Club[], seasonNumber: number): Promise<LeagueSeason> => {
    let newLeagueSeason = new LeagueSeason(teams, seasonNumber, 1);
    newLeagueSeason.matches = generateFixtures(newLeagueSeason.teams);
    return await leagueSeasonRepository.save(newLeagueSeason);
}

const temporaryTeamGetter = async (): Promise<Club[]> => {
    const allClubs = await clubRepository.find();
    return allClubs;
}

// palauttaa tuoreet seurat, jotka eivät ole vielä osana mitään liigaa
const findNonAttachedClubs = async (): Promise<Club[]> => {
    return await clubRepository.find({ where: { leagueSeason: undefined }});
}

// väliaikainen metodi, ei jää käyttöön tällaisena
const findPrecedingLeagueSeasons = async (upcomingSeasonNumber: number): Promise<LeagueSeason[]> => {
    const precedings = await leagueSeasonRepository.find({ where: {ordinal: upcomingSeasonNumber - 1}});
    return precedings;
}