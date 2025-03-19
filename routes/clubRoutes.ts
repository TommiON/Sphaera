import express, {Express, Request, Response} from 'express';

import { clubRepository } from '../repositories/repositories';
import { validateNewClub } from '../validators/clubValidator';

const baseUrl = '/api/club';
const clubRouter = express.Router();

// palauta kaikki klubit
clubRouter.get(`${baseUrl}/`, async (req: Request, res: Response) => {
    const allClubs = await clubRepository.find();

    res.json(allClubs);
})

// lisää uusi klubi
clubRouter.post(`${baseUrl}/`, validateNewClub, async (req: Request, res: Response) => {
    const newClub = {
        name: req.body.name,
        established: new Date()
    }

    const result = await clubRepository.save(newClub);

    res.json(result);
})

export default clubRouter;