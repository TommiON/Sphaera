import gameParameters from "../../domainProperties/gameParameters";
import ArchivedPointInTime from "./archivedPointInTime";
import { organizeNewSeason } from "../../domainEngine/organizer/organizeNewSeason";

export default class Season {
    seasonNumber: number;
    weekNumber: number;

    constructor(previousSeason: Season|null, resumeFromTime: ArchivedPointInTime|null) {
        if (!previousSeason && !resumeFromTime) {
            this.seasonNumber = 1;
            this.weekNumber = 1;
        } else if (previousSeason) {
            this.seasonNumber = previousSeason.seasonNumber + 1;
            this.weekNumber = 1;
        } else if (resumeFromTime) {
            this.seasonNumber = resumeFromTime.season;
            this.weekNumber = resumeFromTime.week;
        }
     
        organizeNewSeason(this.seasonNumber);
    }

    isAboutToEnd = (): boolean => {
        return this.weekNumber >= (2 * (gameParameters.LEAGUE_NUMBER_OF_TEAMS - 1));
    }

    wrapUp = () => {
        console.log('Kausi päättyy...')
    }
}