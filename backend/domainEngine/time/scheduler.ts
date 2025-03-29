import Gameweek from "../../domainObjects/time/gameweek";
import { hasExpired } from "../../utils/timeUtils";

const clockInterval = 5 * 1000;
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
    let nextWeek = new Gameweek(weekIndexing);
    gameweeks.push(nextWeek);
    weekIndexing++;
    console.log('Alkaa uusi viikko: ', getCurrentGameweek());
}

export const getCurrentGameweek = (): Gameweek => {
    return gameweeks[gameweeks.length - 1];
}
