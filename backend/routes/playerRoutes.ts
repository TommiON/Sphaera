import express, {Express, Request, Response} from 'express';

import { playerRepository, clubRepository } from '../repositories/repositories';
import PlayerEntity from '../entities/player.entity';
import ClubEntity from '../entities/club.entity';
import { transferPlayer } from '../domainEngine/player/playerManipulations';

const baseUrl = '/api/player';
const playerRouter = express.Router();

// siirrä pelaaja uuteen seuraan (kohde voi olla myös null-seura)
playerRouter.put(`${baseUrl}/transfer`, async (req: Request, res: Response) => {
    const { playerId, targetClubId } = req.body;
    const result = await transferPlayer(playerId, targetClubId);
    res.json(result);
})

export default playerRouter;

