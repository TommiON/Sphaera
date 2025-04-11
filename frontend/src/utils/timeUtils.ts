export const formatDeadline = (rawDeadline: string): string => {
    const deadline =  new Date(Date.parse(rawDeadline));
    const now = new Date(Date.now());

    const minutesToGo = Math.abs(now.getMinutes() - deadline.getMinutes()) + 1;
    const hoursToGo = Math.abs(now.getHours() - deadline.getHours());
    
    return `x d, ${hoursToGo} h, ${minutesToGo} m kuluessa`;

}

export const parseAndFormatNextBirthday = (birthday: Date): string => {
    return '';
}

export const parseAge = (birthday: Date): number => {
    return 1;
}