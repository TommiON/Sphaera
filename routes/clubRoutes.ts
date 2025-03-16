import express, {Express, Request, Response} from 'express';

import appDataSource from '../config/datasource';
import Club from '../entities/clubs';

const baseUrl = '/api/club';
const clubRepository = appDataSource.getRepository(Club);
const clubRouter = express.Router();

clubRouter.get(`${baseUrl}/`, async (req: Request, res: Response) => {
    const allClubs = await clubRepository.find();

    res.json(allClubs);
})

clubRouter.post(`${baseUrl}/`, async (req: Request, res: Response) => {
    const incomingData = {
        name: req.body.name,
        established: new Date()
    }

    const result = await clubRepository.save(incomingData);

    res.json(result);
})

export default clubRouter;