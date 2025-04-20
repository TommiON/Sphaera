import express, {Express, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { userAccountRepository } from '../repositories/repositories';
import { ValidationError } from './validationError';
import environment from '../config/environment';

export const validateLogin = async (req: Request, res: Response, next: express.NextFunction) => {
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
        res.status(401).json({ 'errors': errors });
    } else {
        next();
    }
}

export const validateToken = async (req: Request, res: Response, next: express.NextFunction) => {
    let errors: ValidationError[] = [];

    const authorizationHeader = req.get('authorization');

    if (!authorizationHeader) {
        errors.push('TOKEN_MISSING');
    } else if (!authorizationHeader.toLowerCase().startsWith('bearer')) {
        errors.push('TOKEN_MALFORMATTED');
    } else {
        try {
            const incomingToken = authorizationHeader.substring(7);
            const secret = environment.tokenSecret as string;
            jsonwebtoken.verify(incomingToken, secret);
        } catch (e) {
            errors.push('TOKEN_DOES_NOT_MATCH');
        }
    }
    
    if (errors.length > 0) {
        res.status(401).json({ 'errors': errors })
    } else {
        next();
    }
}
