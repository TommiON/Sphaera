import ArchivedPointInTime from "../../domainObjects/time/archivedPointInTime"
import TimekeeperEntity from "../../entities/timekeeper.entity";
import { timekeeperRepository } from "../../repositories/repositories";

export const getArchivedTime = async (): Promise<ArchivedPointInTime|null> => {
    const id = await getTablesMaxId();
    if (id) {
        const result = await timekeeperRepository.findOneBy({ id });
        if (result) {
            return {
                season: result.season,
                week: result.week,
                financesDone: result.finances,
                transferDone: result.transfer,
                trainingDone: result.training,
                matchDone: result.match,
                lastWeekEnd: result.lastWeekEnd
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const setArchivedTime = async (updatedValues: ArchivedPointInTime) => {
    const maxId = await getTablesMaxId();
    const updatedResult = await timekeeperRepository
        .createQueryBuilder()
        .update(TimekeeperEntity)
        .set({
            season: updatedValues.season,
            week: updatedValues.week,
            finances: updatedValues.financesDone,
            transfer: updatedValues.transferDone,
            training: updatedValues.trainingDone,
            match: updatedValues.matchDone,
            lastWeekEnd: updatedValues.lastWeekEnd
        })
        .where("id = :id", { id: maxId })
        .execute();
}

const getTablesMaxId = async (): Promise<number|null> => {
    const maxId = await timekeeperRepository
        .createQueryBuilder()
        .select('MAX(TimekeeperEntity.id)', 'max')
        .getRawOne();
    
    if (maxId.max) {
        return maxId.max;
    } else {
        return null;
    }
}