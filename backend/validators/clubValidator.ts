import express, {Express, Request, Response} from 'express';

import { clubRepository } from '../repositories/repositories';

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