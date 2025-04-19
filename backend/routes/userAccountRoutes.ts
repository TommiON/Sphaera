import express, {Express, Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { userAccountRepository } from '../repositories/repositories';
import { validateNewUserAccount } from '../validators/newUserValidator';
import { validateAuthentication } from '../validators/authenticationValidator';

const baseUrl = '/api/useraccount';
const userAccountRouter = express.Router();

// lisää uusi käyttäjä
userAccountRouter.post(`${baseUrl}/`, validateNewUserAccount, async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userAccountRepository.save({
        username: req.body.username,
        password: hashedPassword
    })

    const newUserWithoutPassword = { username: newUser.username};

    res.json(newUserWithoutPassword);
})

// autentikointi sisäänkirjauduttaessa
userAccountRouter.post(`${baseUrl}/login/`, validateAuthentication, async (req: Request, res: Response) => {
    res.sendStatus(200);
})

// palauta kaikki käyttäjät
userAccountRouter.get(`${baseUrl}/`, async (req: Request, res: Response) => {
    const allUsers = await userAccountRepository.find({ select: {username: true}});
    
    res.json(allUsers);
})

export default userAccountRouter;