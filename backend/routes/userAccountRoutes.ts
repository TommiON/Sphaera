import express, {Express, Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { userAccountRepository, clubRepository } from '../repositories/repositories';
import { validateNewUserAccount } from '../validators/newUserValidator';
import { validateLogin, validateToken } from '../validators/authenticationValidator';
import { initAndSaveClub } from '../domainEngine/club/clubInitializer';
import { generateAuthenticationToken } from '../utils/authenticationUtils';

const baseUrl = '/api/useraccount';
const userAccountRouter = express.Router();

// lisää uusi käyttäjä
userAccountRouter.post(`${baseUrl}/`, validateNewUserAccount, async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userAccountRepository.save({
        username:   req.body.username,
        password:   hashedPassword
    })

    const newClub = await initAndSaveClub(req.body.clubname, newUser);

    res.json({ 
        username:   newUser.username,
        club:       newClub.name
    });
})

// sisäänkirjautuminen
userAccountRouter.post(`${baseUrl}/login/`, validateLogin, async (req: Request, res: Response) => {
    const usersClub = await clubRepository.findOne({
        select: {
            id: true,
            name: true
        },
        relations: {
            account: true,
        },
        where: {
            account: {
                username: req.body.username
            }
        },
    });

    res.json({
        username:   req.body.username,
        clubid:     usersClub?.id,
        clubname:   usersClub?.name,
        token:      generateAuthenticationToken(req.body.username, usersClub?.id)
    });
})

// palauta kaikki käyttäjät
userAccountRouter.get(`${baseUrl}/`, validateToken, async (req: Request, res: Response) => {
    const allUsers = await userAccountRepository.find({ select: {username: true}});
    
    res.json(allUsers);
})

export default userAccountRouter;