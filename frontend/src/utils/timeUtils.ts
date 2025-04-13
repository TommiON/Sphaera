const MINUTE_IN_MILLISECONDS = 1000 * 60;
const HOUR_IN_MILLISECONDS = MINUTE_IN_MILLISECONDS * 60;
const DAY_IN_MILLISECONDS = HOUR_IN_MILLISECONDS * 24;

export const formatDeadline = (rawDeadline: string): string => {
    const deadline =  new Date(Date.parse(rawDeadline));
    const now = new Date(Date.now());

    let timeToDeadline = deadline.getTime() - now.getTime();

    const daysToDeadline = Math.floor(timeToDeadline / DAY_IN_MILLISECONDS);
    timeToDeadline = timeToDeadline - (daysToDeadline * DAY_IN_MILLISECONDS);

    const hoursToDeadline = Math.floor(timeToDeadline / HOUR_IN_MILLISECONDS);
    timeToDeadline = timeToDeadline - (hoursToDeadline * HOUR_IN_MILLISECONDS);

    const minutesToDeadline = Math.floor(timeToDeadline / MINUTE_IN_MILLISECONDS);
    
    return `${daysToDeadline} d, ${hoursToDeadline} h, ${minutesToDeadline} m kuluessa`;
}

export const parseAndFormatNextBirthday = (birthday: Date): string => {
    return '';
}

export const parseAge = (birthday: Date): number => {
    return 1;
}