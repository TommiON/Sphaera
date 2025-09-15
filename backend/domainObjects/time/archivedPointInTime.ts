export default interface ArchivedPointInTime {
    season: number;
    week: number;
    financesDone: boolean;
    transferDone: boolean;
    trainingDone: boolean;
    matchDone: boolean;
    lastWeekEnd: Date;
}