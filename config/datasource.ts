import { DataSource } from "typeorm";

import environment from "./environment";
import ClubEntity from "../entities/club.entity";
import PlayerEntity from "../entities/player.entity";

const appDataSource = new DataSource({
    type: 'postgres',
    host: environment.dbHost,
    port: 5432,
    username: environment.dbUsername,
    password: environment.dbPassword,
    synchronize: true,
    logging: false,
    entities: [ClubEntity, PlayerEntity],
    subscribers: [],
    migrations: []
});

export default appDataSource;