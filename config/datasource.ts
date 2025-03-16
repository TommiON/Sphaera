import { DataSource } from "typeorm";

import environment from "./environment";
import Club from "../entities/clubs";
import Player from "../entities/players";

const appDataSource = new DataSource({
    type: 'postgres',
    host: environment.dbHost,
    port: 5432,
    username: environment.dbUsername,
    password: environment.dbPassword,
    synchronize: true,
    logging: true,
    entities: [Club, Player],
    subscribers: [],
    migrations: []
});

export default appDataSource;