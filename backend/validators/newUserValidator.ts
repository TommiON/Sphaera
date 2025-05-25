import express, {Express, Request, Response} from 'express';

import { userAccountRepository, clubRepository } from '../repositories/repositories';
import { ValidationError } from './validationError';

export const validateNewUserAccount = async (req: Request, res: Response, next: express.NextFunction) => {
    let errors: ValidationError[] = [];

    const existingUsersWithSameName = await userAccountRepository.find({ where: { username: req.body.username }});
    
    if (existingUsersWithSameName.length > 0) {
        errors.push('USERNAME_ALREADY_TAKEN');
    }

    if (!req.body.username || req.body.username.length < 5) {
        errors.push('USERNAME_INSUFFICIENT');
    }

    if (!req.body.password || req.body.password.length < 6) {
        errors.push('PASSWORD_INSUFFICIENT');
    }

    const existingClubsWithSameName = await clubRepository.find({ where: { name: req.body.clubname }});

    if (existingClubsWithSameName.length > 0) {
        errors.push('CLUBNAME_ALREADY_TAKEN');
    }

    if (!req.body.clubname || req.body.clubname < 4) {
        errors.push('CLUBNAME_INSUFFICIENT');
    }

    if (errors.length > 0) {
        res.status(400).json({ 'errors': errors });
    } else {
        next();
    }
}