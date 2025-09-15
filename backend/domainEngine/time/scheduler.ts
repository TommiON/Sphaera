import Gameweek from "../../domainObjects/time/gameweek";
import Season from "../../domainObjects/time/season";
import { hasExpired } from "../../utils/timeUtils";
import environment from "../../config/environment";
import { getArchivedTime, setArchivedTime } from "./timekeeper";
import ArchivedPointInTime from "../../domainObjects/time/archivedPointInTime";
import Deadline from "../../domainObjects/time/deadline";

const clockInterval = environment.clockInterval as number;

let currentSeason: Season;
let currentWeek: Gameweek;

export const startScheduler = () => {
    start();
   
    setInterval(() => {
        if (hasExpired(currentWeek.end)) {
            startNextWeek();
        }

        currentWeek.deadlines.forEach(deadline => {
            if (hasExpired(deadline.due)) {
                deadline.expirationCallback();
                currentWeek.deadlines = currentWeek.deadlines.filter(d => d.kind != deadline.kind);

                updateArchivedTime(currentSeason, currentWeek)
            }
        });
        
    }, clockInterval);
}

const start = async () => {
    const archivedTime: ArchivedPointInTime|null = await getArchivedTime();

    if (archivedTime) {
        resumeSeason(archivedTime);
    } else {
        startNextSeason();
    }
}

const startNextSeason = () => {
    if (currentSeason) currentSeason.wrapUp();

    // huom ei välttämättä toimi
    currentSeason = new Season(currentSeason, null);
    startNextWeek();
}

const resumeSeason = async (startingPoint: ArchivedPointInTime) => {
    currentSeason = new Season(null, startingPoint);
    currentWeek = new Gameweek(startingPoint);
}

const startNextWeek = () => {
    if (currentSeason.isAboutToEnd()) {
        startNextSeason();
    } else {
        currentSeason.weekNumber++;
        currentWeek = new Gameweek();        
    }

    updateArchivedTime(currentSeason, currentWeek);
}

const updateArchivedTime = (currentSeason: Season, currentWeek: Gameweek) => {
    setArchivedTime({
        season:         currentSeason.seasonNumber,
        week:           currentSeason.weekNumber,
        financesDone:   !currentWeek.deadlines.map(d => d.kind).includes('finances'),
        transferDone:   !currentWeek.deadlines.map(d => d.kind).includes('transfer'),
        trainingDone:   !currentWeek.deadlines.map(d => d.kind).includes('training'),
        matchDone:      !currentWeek.deadlines.map(d => d.kind).includes('match'),
        lastWeekEnd:    getCurrentGameweek().start
    });

}

export const getCurrentGameweek = (): Gameweek => {
    return currentWeek;
}
