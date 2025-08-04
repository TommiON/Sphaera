import { hasExpired, currentMomentPlusGameDays, currentMomentPlusGameWeek, gameWeekInMilliseconds,
    plusGameDaysFromMoment, plusGameWeekFromMoment
 } from "../timeUtils";

const now: Date = new Date();
const nowInMillis: number = now.getTime();
const yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));
const yesterdayInMillis: number = yesterday.getTime();
const tomorrow: Date = new Date(new Date().setDate(new Date().getDate() +1));
const tomorrowInMillis: number = tomorrow.getTime();
const aMinuteAgo: Date = new Date(new Date().setMinutes(new Date().getMinutes() - 1));
const aMinuteFromNow: Date = new Date(new Date().setMinutes(new Date().getMinutes() + 1));
const toleratedOffsetInMillis: number = 1000;

test('time utils / chech deadline expiration', () => {
    // WHEN: checking yesterday and tomorrow for expiration THEN the first one has expired, the second one not
    expect(hasExpired(aMinuteAgo)).toBe(true);
    expect(hasExpired(aMinuteFromNow)).toBe(false);
})

test('time utils / generate future dates from current moment', () => {
    // WHEN: generating a Date one gameweek from now
    const plusWeekFromNow = currentMomentPlusGameWeek();

    // THEN: result is one gameweek from now, within tolerated offset (due to test running)
    expect(plusWeekFromNow.getTime() - nowInMillis)
        .toBeGreaterThanOrEqual(gameWeekInMilliseconds - toleratedOffsetInMillis);
    expect(plusWeekFromNow.getTime() - nowInMillis)
        .toBeLessThanOrEqual(gameWeekInMilliseconds + toleratedOffsetInMillis);

    // AND WHEN: generating a Date three gamedays from now
    const plus3DaysFromNow = currentMomentPlusGameDays(3);

    // THEN: result is three gamedays from now, within tolerated offset (due to test running)
    expect(plus3DaysFromNow.getTime() - nowInMillis)
        .toBeGreaterThanOrEqual((3 * (gameWeekInMilliseconds / 7)) - toleratedOffsetInMillis);
    expect(plus3DaysFromNow.getTime() - nowInMillis)
        .toBeLessThanOrEqual((3 * (gameWeekInMilliseconds / 7)) + toleratedOffsetInMillis);
})

test('time utils / generate future dates from parameterized moment', () => {
    // WHEN: generating a Date one gameweek from tomorrow
    const testDateA = plusGameWeekFromMoment(tomorrow);

    // THEN: result is one gameweek from tomorrow, within tolerated offset (due to test running)
    expect(tomorrowInMillis + gameWeekInMilliseconds)
        .toBeGreaterThanOrEqual(testDateA.getTime() - toleratedOffsetInMillis);
    expect(tomorrowInMillis + gameWeekInMilliseconds)
        .toBeLessThanOrEqual(testDateA.getTime() + toleratedOffsetInMillis);   
})