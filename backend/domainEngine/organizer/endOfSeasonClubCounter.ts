import { clubRepository } from "../../repositories/repositories";
import LeagueSeasonEntity from "../../entities/leagueSeason.entity";

interface ClubCountResult {
    clubsAlreadyAttached: number;
    clubsNotYetAttached: number;
}

/**
 * Counts user clubs that are attached and not attached to any active league season
 * Active league seasons are those that have started but not finished
 * @returns Object with count of attached and notAttached user clubs
 */
export const countUserClubsInbetweenSeasons = async (): Promise<ClubCountResult> => {
    const attached = await clubRepository
        .createQueryBuilder('club')
        .innerJoin('club.account', 'account')
        .innerJoin(
            'club.leagueSeason',
            'leagueSeason', 
            'leagueSeason.started = :started AND leagueSeason.finished = :finished', 
            { started: true, finished: false })
        .getCount();

    const totalUserClubs = await clubRepository
        .createQueryBuilder('club')
        .innerJoin('club.account', 'account')
        .getCount();

    return {
        clubsAlreadyAttached: attached,
        clubsNotYetAttached: totalUserClubs - attached
    };
};
