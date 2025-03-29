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
            expirationCallback: () => console.log('Paukahti talousdedis')
        });

        this.deadlines.push({
            kind: 'transfer',
            due: currentMomentPlusGameDays(3),
            expirationCallback: () => console.log('Paukahti siirtodedis')
        });

        this.deadlines.push({
            kind: 'training',
            due: currentMomentPlusGameDays(4),
            expirationCallback: () => console.log('Paukahti treenidedis')
        });

        this.deadlines.push({
            kind: 'match',
            due: currentMomentPlusGameDays(6),
            expirationCallback: () => console.log('Paukahti otteludedis')
        });
    }
}

export default Gameweek;