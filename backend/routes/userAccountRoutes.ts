import express, {Express, Request, Response} from 'express';

import { userAccountRepository } from '../repositories/repositories';
import { validateNewUserAccount } from '../validators/newUserValidator';

const baseUrl = '/api/useraccount';
const userAccountRouter = express.Router();

// lisää uusi käyttäjä
userAccountRouter.post(`${baseUrl}/`, validateNewUserAccount, async (req: Request, res: Response) => {
    const newUser = await userAccountRepository.save({
        username: req.body.username,
        password: req.body.password
    })

    res.json(newUser);
})

// palauta kaikki käyttäjät
userAccountRouter.get(`${baseUrl}/`, async (req: Request, res: Response) => {
    const allUsers = await userAccountRepository.find({
        select: {username: true}
    });
    res.json(allUsers);
})

export default userAccountRouter;