import express, {Express, Request, Response} from 'express';

const baseUrl = '/api/healthcheck';
const healthCheckRouter = express.Router();

healthCheckRouter.get(`${baseUrl}/`, (req: Request, res: Response) => {
    res.json( {"Tila": "Ei valittamista"} );
})

export default healthCheckRouter;
