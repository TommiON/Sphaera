import Club from "../../domainObjects/club/club";
import LeagueSeason from "../../domainObjects/league/leagueSeason";
import { clubRepository, leagueSeasonRepository } from "../../repositories/repositories";

export const organizeNewSeason = async (seasonNumber: number) => {
    /* 
    - edellisen kauden putoamiset ja promootiot
    - uusien seurojen hakeminen reserviliigasta
    - tarvittaessa sarjapyramidin kasvattaminen (myös kutistaminen?)
    - tarvittaessa auto-joukkueiden luominen
    */
    const clubsWithoutLeague = await findNonAttachedClubs();
    const s = await createLeagueSeason(clubsWithoutLeague, seasonNumber);
}

const createLeagueSeason = async(teams: Club[], seasonNumber: number): Promise<LeagueSeason> => {
    return await leagueSeasonRepository.save(new LeagueSeason(teams, seasonNumber));
    
}

// palauttaa tuoreet seurat, jotka eivät ole vielä osana mitään liigaa
const findNonAttachedClubs = async(): Promise<Club[]> => {
    return await clubRepository.find({ where: { leagueSeason: undefined }});
}
