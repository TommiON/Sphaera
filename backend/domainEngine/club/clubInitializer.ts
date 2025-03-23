import Club from "../../domainObjects/club/club";
import Player from "../../domainObjects/player/player";
import { clubRepository, playerRepository } from "../../repositories/repositories";
import ClubEntity from "../../entities/club.entity";
import gameParameters from "../../domainProperties/gameParameters";
import { possibleLastNames, possibleFirstNames } from "../../domainProperties/nameConstants";
import { getRandomElement, getRandomNumberInRange } from "../../utils/randomizer";
import { transformEnumIntoStringList } from "../../utils/generalHelperFunctions";
import Trait from "../../domainObjects/player/trait";

export const initAndSaveClub = async (proposedName: string): Promise<Club> => {
    let club = { 
        name: proposedName, 
        established: new Date()
    };
    
    const savedClub = await clubRepository.save(club) as ClubEntity;

    for (let i = 0; i < gameParameters.CLUB_NUMBER_OF_PLAYERS_AT_START; i++) {
        await initAndSavePlayerForClub(savedClub);
    }

    return club;
}

const initAndSavePlayerForClub = async (club: ClubEntity) => {
    const savedPlayer = await playerRepository.save({
        name:           getRandomElement(possibleFirstNames) + ' ' + getRandomElement(possibleLastNames),
        birthday:       generateBirthday(),
        footedness:     getRandomElement(['right', 'left', 'both'], [80, 95]),
        stamina:        getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        ruggedness:     getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        pace:           getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        vision:         getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        positioning:    getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        experience:     1,
        heading:        getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        shooting:       getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        shortPassing:   getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        longPassing:    getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        ballControl:    getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        tackling:       getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        goalkeeping:    getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        dribbling:      getRandomNumberInRange(1, gameParameters.PLAYER_SKILL_CEILING_AT_START),
        trait:          generateTraits()
    });

    await clubRepository.createQueryBuilder().relation(ClubEntity, 'players').of(club).add(savedPlayer);
}

const generateTraits = (): string | undefined => {
    if (getRandomNumberInRange(0,100) <= gameParameters.PLAYER_PROPABILITY_OF_TRAIT * 100) {
        return getRandomElement(transformEnumIntoStringList(Trait));
    } else {
       return undefined;
    }
}

const generateBirthday = (): Date => {
    const month = getRandomNumberInRange(0,12);
    
    let day = getRandomNumberInRange(1,32);
    if (month == 1 && day > 28) {
        day = day - (day - 28);
    } else if ((month == 3 || month == 5 || month == 8 || month == 10) && day > 30) {
        day -= 1;
    }

    const ageYears = getRandomNumberInRange(gameParameters.PLAYER_MIN_AGE_AT_START, gameParameters.PLAYER_MAX_AGE_AT_START + 1);
    const year = new Date().getFullYear() - ageYears;

    return new Date(year, month, day);
}