import Deadline from "./deadline";
import { currentMoment, currentMomentPlusGameWeek, currentMomentPlusGameDays } from "../../utils/timeUtils";

class Gameweek {
    ordinal: number;
    start: Date;
    end: Date;
    deadlines: Deadline[] = [];

    constructor(nextOrdinal: number) {
        this.ordinal = nextOrdinal;
        this.start = currentMoment();
        this.end = currentMomentPlusGameWeek();

        this.deadlines.push({
            kind: 'finances',
            due: currentMomentPlusGameDays(2),
            expirationCallback: () => {}
        });

        this.deadlines.push({
            kind: 'transfer',
            due: currentMomentPlusGameDays(3),
            expirationCallback: () => {}
        });

        this.deadlines.push({
            kind: 'training',
            due: currentMomentPlusGameDays(4),
            expirationCallback: () => {}
        });

        this.deadlines.push({
            kind: 'match',
            due: currentMomentPlusGameDays(6),
            expirationCallback: () => {}
        });
    }
}

export default Gameweek;