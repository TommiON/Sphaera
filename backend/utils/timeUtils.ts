import gameParameters from "../domainProperties/gameParameters";

export const gameWeekInMilliseconds = gameParameters.TIME_GAME_WEEK_IN_REAL_MINUTES * 60 * 1000;

const gameDayInMilliseconds = gameWeekInMilliseconds / 7;

export function currentMoment(): Date {
    return new Date(Date.now());
}

export function currentMomentPlusGameWeek(): Date {
    return new Date(Date.now() + gameWeekInMilliseconds);
}

export function currentMomentPlusGameDays(days: number): Date {
    return new Date(Date.now() + (days * gameDayInMilliseconds));
}

export function hasExpired(target: Date): boolean {
    return Date.now() >= target.getTime();
}

