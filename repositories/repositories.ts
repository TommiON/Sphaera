import appDataSource from '../config/datasource';

import ClubEntity from '../entities/club.entity';
export const clubRepository = appDataSource.getRepository(ClubEntity);

import PlayerEntity from '../entities/player.entity';
export const playerRepository = appDataSource.getRepository(PlayerEntity);

