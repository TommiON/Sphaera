import express from "express";
import cors from "cors";

import environment from "./config/environment";
import appDataSource from "./config/datasource";
import healthCheckRouter from "./routes/healthCheckRoutes";
import clubRouter from "./routes/clubRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(healthCheckRouter);
app.use(clubRouter);

const start = () => {
    appDataSource.initialize()
        .then(() => {
            app.listen(environment.port);
            console.log('Sovellus käynnissä ja kuuntelee porttia ', environment.port);
        })
        .catch((error) => console.log('Virhe tietokannan alustamisessa: ', error))
}

start();