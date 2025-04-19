import express, {Express, Request, Response} from 'express';

import { userAccountRepository } from '../repositories/repositories';
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

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}