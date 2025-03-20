import Club from "../../domainObjects/club/club";
import Player from "../../domainObjects/player/player";
import { clubRepository, playerRepository } from "../../repositories/repositories";
import ClubEntity from "../../entities/club.entity";
import gameParameters from "../../domainProperties/gameParameters";
import { possibleLastNames, possibleFirstNames } from "../../domainProperties/nameConstants";
import { getRandomElement, getRandomNumberInRange } from "../../utils/randomizer";

export const initAndSaveClub = async (proposedName: string): Promise<Club> => {
    let club = { 
        name: proposedName, 
        established: new Date()
    };
    
    const savedClub = await clubRepository.save(club) as ClubEntity;

    for (let i = 0; i < gameParameters.numberOfPlayersAtStart; i++) {
        await initAndSavePlayerForClub(savedClub);
    }

    // players.forEach(p => console.log('PELAAJA: ', p))

    // await clubRepository.createQueryBuilder().relation(ClubEntity, 'players').of(club).add(players[0]);

    return club;
}

const initAndSavePlayerForClub = async (club: ClubEntity) => {
    const savedPlayer = await playerRepository.save({
        name:       getRandomElement(possibleFirstNames) + ' ' + getRandomElement(possibleLastNames),
        birthday:   new Date(),
        footedness: getRandomElement(['right', 'left', 'both'], [80, 95]),
        stamina:    getRandomNumberInRange(1, gameParameters.skillCeilingAtStart),
        ruggedness: getRandomNumberInRange(1, gameParameters.skillCeilingAtStart),
        pace:       getRandomNumberInRange(1, gameParameters.skillCeilingAtStart)
    });

    await clubRepository.createQueryBuilder().relation(ClubEntity, 'players').of(club).add(savedPlayer);
}