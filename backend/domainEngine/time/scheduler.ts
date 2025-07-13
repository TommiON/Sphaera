import Gameweek from "../../domainObjects/time/gameweek";
import { hasExpired } from "../../utils/timeUtils";
import environment from "../../config/environment";

const clockInterval = environment.clockInterval as number;
let gameweeks: Gameweek[] = [];
let weekIndexing = 0;

export const startScheduler = () => {
    buildNextWeek();
    setInterval(() => {
        if (hasExpired(getCurrentGameweek().end)) {
            buildNextWeek();
        }

        getCurrentGameweek().deadlines.forEach(deadline => {
            if (hasExpired(deadline.due)) {
                deadline.expirationCallback();
                getCurrentGameweek().deadlines = getCurrentGameweek().deadlines.filter(d => d.kind != deadline.kind);
            }
        });
    }, clockInterval);
}

const buildNextWeek = () => {
    gameweeks.push(new Gameweek(weekIndexing));
    weekIndexing++;
}

export const getCurrentGameweek = (): Gameweek => {
    return gameweeks[gameweeks.length - 1];
}
