import express, {Express, Request, Response} from 'express';

import appDataSource from '../config/datasource';
import Club from '../entities/clubs';

// nää kannattaisi varmaan keskittää jonnekin omaan palveluluokkaansa? utilities?
const clubRepository = appDataSource.getRepository(Club);

export const validateNewClub = (req: Request, res: Response, next: express.NextFunction) => {
    if (!req.body.name) {
        res.status(400).json({ error: 'Nimi puuttuu'});
    } else if (nameAlreadyUsed(req.body.name)) {
        res.status(400).json({ error: 'Nimi on varattu'});
    } else {
        next();
    }
}

// tämä ei toimi
function nameAlreadyUsed(proposedName: string): boolean {
    let inUse: boolean = false;
    clubRepository.find({ where: { name: proposedName } })
        .then(response => inUse = response.length > 0);
    return inUse;
}