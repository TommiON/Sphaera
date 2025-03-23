import { clubRepository, playerRepository } from "../../repositories/repositories"
import PlayerEntity from "../../entities/player.entity"

// pelaajan siirto toiseen seuraan (tai nulliin, jos pelaajalla ei ole enää seuraa)
export const transferPlayer = async (playerId: number, targetClubId: number | null): Promise<PlayerEntity> => {
    await playerRepository
        .createQueryBuilder()
        .relation(PlayerEntity, 'club')
        .of(playerId)
        .set(targetClubId);
    
    const playingNumbersInTargetClub = await playerRepository
        .createQueryBuilder()
        .select('MAX(PlayerEntity.playingNumber)', 'max')
        .where('PlayerEntity.clubId = :id', { id: targetClubId })
        .getRawOne();

    await playerRepository
        .createQueryBuilder()
        .update(PlayerEntity)
        .set({ playingNumber: playingNumbersInTargetClub.max + 1})
        .where('id = :id', { id: playerId})
        .execute();
    
    const result = await playerRepository.find({
        where: { id: playerId },
        relations: { club: true }
    });

    return result[0];
}

// tänne muut pelaajamuutokset: loukkaantuminen, vireen muutos, treenimuutokset jne.