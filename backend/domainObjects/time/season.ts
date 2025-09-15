import gameParameters from "../../domainProperties/gameParameters";
import ArchivedPointInTime from "./archivedPointInTime";

export default class Season {
    seasonNumber: number;
    weekNumber: number;

    constructor(previousSeason: Season|null, resumeFromTime: ArchivedPointInTime|null) {
        if (!previousSeason && !resumeFromTime) {
            console.log('X Uusi kausi tyhjästä')
            this.seasonNumber = 1;
            this.weekNumber = 1;
        } else if (previousSeason) {
            console.log('X Uusi kausi aiemman pohjalta')
            this.seasonNumber = previousSeason.seasonNumber++;
            this.weekNumber = 1;
        } else if (resumeFromTime) {
            console.log('X Palautetaan kausi arkiston arvoista', resumeFromTime)
            this.seasonNumber = resumeFromTime.season;
            this.weekNumber = resumeFromTime.week;
        }
        
            // tänne uuden kauden käynnistykseen liittyvä logiikka, tai kutsut siihen
    }

    isAboutToEnd = (): boolean => {
        return this.weekNumber >= (2 * (gameParameters.LEAGUE_NUMBER_OF_TEAMS - 1));
    }

    wrapUp = () => {
        console.log('Kausi päättyy...')
    }
}