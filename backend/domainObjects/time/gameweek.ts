import Deadline from "./deadline";
import ArchivedPointInTime from "./archivedPointInTime";
import { currentMoment, currentMomentPlusGameWeek, currentMomentPlusGameDays, plusGameWeekFromMoment, plusGameDaysFromMoment} from "../../utils/timeUtils";

class Gameweek {
    start: Date;
    end: Date;
    deadlines: Deadline[] = [];

    constructor(resumeFromTime?: ArchivedPointInTime) {
        if (resumeFromTime) {
            this.start = resumeFromTime.lastWeekEnd;
            this.end = plusGameWeekFromMoment(this.start);
        } else {
            this.start = currentMoment();
            this.end = plusGameWeekFromMoment(this.start);
        }
        
        if (!resumeFromTime || (resumeFromTime && !resumeFromTime.financesDone)) {
            this.deadlines.push({
                kind: 'finances',
                due: plusGameDaysFromMoment(this.start, 2),
                expirationCallback: () => {}
            });
        }

        if (!resumeFromTime || (resumeFromTime && !resumeFromTime.transferDone)) {
            this.deadlines.push({
                kind: 'transfer',
                due: plusGameDaysFromMoment(this.start, 3),
                expirationCallback: () => {}
            });
        }
        
        if (!resumeFromTime || (resumeFromTime && !resumeFromTime.trainingDone)) {
            this.deadlines.push({
                kind: 'training',
                due: plusGameDaysFromMoment(this.start, 4),
                expirationCallback: () => {}
            });
        }

        if (!resumeFromTime || (resumeFromTime && !resumeFromTime.matchDone)) {
            this.deadlines.push({
                kind: 'match',
                due: plusGameDaysFromMoment(this.start, 6),
                expirationCallback: () => {}
            });
        }

        console.log('Viikon dedikset', this.deadlines)
    }
}

export default Gameweek;