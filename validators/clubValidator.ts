import express, {Express, Request, Response} from 'express';

import appDataSource from '../config/datasource';
import Club from '../entities/clubs';

const clubRepository = appDataSource.getRepository(Club);


export const validateNewClub = async (req: Request, res: Response, next: express.NextFunction) => {
    const existingClubs = await clubRepository.find({ where: { name: req.body.name }});

    if (!req.body.name) {
        res.status(400).json({ error: 'Nimi puuttuu'});
        return;
    } else if (existingClubs.length > 0) {
        res.status(400).json({ error: 'Nimi varattu'});
        return;
    } else {
        next();
    }
}