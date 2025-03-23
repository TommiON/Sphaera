import express, {Express, Request, Response} from 'express';

import { playerRepository, clubRepository } from '../repositories/repositories';
import PlayerEntity from '../entities/player.entity';
import ClubEntity from '../entities/club.entity';

const baseUrl = '/api/player';
const playerRouter = express.Router();

export default playerRouter;

