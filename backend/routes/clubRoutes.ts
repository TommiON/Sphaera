import express, {Express, Request, Response} from 'express';

import { clubRepository } from '../repositories/repositories';
import { validateNewClub } from '../validators/clubValidator';
import ClubEntity from '../entities/club.entity';
import { initAndSaveClub } from '../domainEngine/club/clubInitializer';

const baseUrl = '/api/club';
const clubRouter = express.Router();

// palauta kaikki
clubRouter.get(`${baseUrl}/`, async (req: Request, res: Response) => {
    const allClubs = await clubRepository.find();
    res.json(allClubs);
});

// lisää uusi
clubRouter.post(`${baseUrl}/`, validateNewClub, async (req: Request, res: Response) => {
    const result = await initAndSaveClub(req.body.name);
    res.json(result);
});

// palauta pelaajat
// mutta jos tää on täällä, mikä itse asiassa player-routterin idea?
clubRouter.get(`${baseUrl}/players`, async (req: Request, res: Response) => {
    const players = await clubRepository.createQueryBuilder().relation(ClubEntity, 'players').of(req.body.clubId).loadMany();
    res.json(players);
})

export default clubRouter;