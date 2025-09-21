import { DataSource } from "typeorm";

import environment from "./environment";
import ClubEntity from "../entities/club.entity";
import PlayerEntity from "../entities/player.entity";
import UserAccountEntity from "../entities/userAccount.entity";
import TimekeeperEntity from "../entities/timekeeper.entity";
import LeagueSeasonEntity from "../entities/leagueSeason.entity";

const appDataSource = new DataSource({
    type: 'postgres',
    host: environment.dbHost,
    port: 5432,
    username: environment.dbUsername,
    password: environment.dbPassword,
    synchronize: true,
    logging: false,
    entities: [
        ClubEntity,
        PlayerEntity,
        UserAccountEntity,
        TimekeeperEntity,
        LeagueSeasonEntity],
    subscribers: [],
    migrations: []
});

export default appDataSource;