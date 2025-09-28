import appDataSource from '../config/datasource';

import ClubEntity from '../entities/club.entity';
export const clubRepository = appDataSource.getRepository(ClubEntity);

import PlayerEntity from '../entities/player.entity';
export const playerRepository = appDataSource.getRepository(PlayerEntity);

import UserAccountEntity from '../entities/userAccount.entity';
export const userAccountRepository = appDataSource.getRepository(UserAccountEntity);

import TimekeeperEntity from '../entities/timekeeper.entity';
export const timekeeperRepository = appDataSource.getRepository(TimekeeperEntity);

import LeagueSeasonEntity from '../entities/leagueSeason.entity';
export const leagueSeasonRepository = appDataSource.getRepository(LeagueSeasonEntity);

import MatchEntity from '../entities/match.entity';
export const matchRepository = appDataSource.getRepository(MatchEntity);

