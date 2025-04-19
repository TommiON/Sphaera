import express, {Express, Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { userAccountRepository } from '../repositories/repositories';
import { ValidationError } from './validationError';

export const validateAuthentication = async (req: Request, res: Response, next: express.NextFunction) => {
    let errors: ValidationError[] = [];

    const userAccounts = await userAccountRepository.find({ where: { username: req.body.username }});

    if (userAccounts.length == 0) {
        errors.push('USERNAME_NOT_FOUND');
    } else {
        const userAccount = userAccounts[0];
        const correctPassword = await bcrypt.compare(req.body.password, userAccount.password);
        if (!correctPassword) {
            errors.push('PASSWORD_DOES_NOT_MATCH');
        }
    }

    if (errors.length > 0) {
        res.status(400).json({ 'errors': errors });
    } else {
        next();
    }
}
