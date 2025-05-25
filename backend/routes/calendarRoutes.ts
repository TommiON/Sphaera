import express, {Express, Request, Response} from 'express';

import { getCurrentGameweek } from '../domainEngine/time/scheduler';
import { validateToken } from '../validators/authenticationValidator';

const baseUrl = '/api/calendar';
const calendarRouter = express.Router();

calendarRouter.get(`${baseUrl}/week`, async (req: Request, res: Response) => {
    const currentWeek = getCurrentGameweek();
    res.json(currentWeek);
});

export default calendarRouter;