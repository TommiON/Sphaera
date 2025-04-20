import express, {Express, Request, Response} from 'express';

import { clubRepository } from '../repositories/repositories';
import ClubEntity from '../entities/club.entity';
import { validateToken } from '../validators/authenticationValidator';

const baseUrl = '/api/club';
const clubRouter = express.Router();

// palauta kaikki
clubRouter.get(`${baseUrl}/`, validateToken, async (req: Request, res: Response) => {
    const allClubs = await clubRepository.find();
    res.json(allClubs);
});

// palauta pelaajat
clubRouter.get(`${baseUrl}/:clubId/players`, validateToken, async (req: Request, res: Response) => {
    const players = await clubRepository.createQueryBuilder().relation(ClubEntity, 'players').of(req.params.clubId).loadMany();
    res.json(players);
})

export default clubRouter;