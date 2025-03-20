import express, {Express, Request, Response} from 'express';

import { playerRepository, clubRepository } from '../repositories/repositories';
import PlayerEntity from '../entities/player.entity';
import ClubEntity from '../entities/club.entity';

const baseUrl = '/api/player';
const playerRouter = express.Router();

// lisää uusi -> tää ei itse asiassa lainkaan REST-hommia, tulee backendin aloitteesta?
playerRouter.post(`${baseUrl}/`, async (req: Request, res: Response) => {
    const newPlayer = await playerRepository.save({
        name: req.body.name,
        birthday: new Date(),
        footedness: 'left'
    })

    console.log('uuden pelaajan id: ', newPlayer.id)

    await clubRepository.createQueryBuilder().relation(ClubEntity, "players").of(req.body.clubId).add(newPlayer.id);

    res.json(newPlayer);

})

export default playerRouter;

