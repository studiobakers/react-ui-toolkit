import { DateTimerProps, TimerType } from "../../../date-timer/util/dateTimerTypes";
import { FormatDateUtilOptions, RemainingTimeBreakdown } from "./timeTypes";
declare function sortDateRange(initialRange: Date[]): Date[];
declare function calculateRemainingTimeBreakdown(range: DateTimerProps["range"], intervalCount?: number, timerType?: TimerType): RemainingTimeBreakdown;
/**
 * Formats a Date object into a human friendly string
 *
 * Note on usage:
 *    Whenever the timezone information is not available and a date object that is passed to this
 *    function is generated from a ISO-8601 date string (yyyy-MM-dd), `shouldShiftDateToCompensateForTimezone` option should be set to `true`.
 *
 *    Otherwise, displayed date would be inconsistent with the data.
 *    For example, for a user with Eastern Daylight Time (to generalize, any user that has a negative UTC offset),
 *    the following Date object is created for "2007-05-16": Tue May 15 2007 20:00:00 GMT-0400 (Eastern Daylight Time) {}.
 *    Therefore, 15 May appears on the screen. By passing `new Date("2007-05-16")` value to `compensateForTimezone` utility, we fix this problem.
 *
 *    When the timezone information is passed to `formatDateWithOptions`, this extra compensation is redundant as `date-fns-tz/utcToZonedTime` handles it correctly.
 *
 * @param {object} options FormatDateUtilOptions
 * @return {string} Formatted date
 */
declare function formatDateWithOptions(options: FormatDateUtilOptions): (date: Date) => string;
/**
 * Shifts the time of the Date object by the system's UTC offset to avoid timezone issues.
 *
 * For example, for a user with Eastern Daylight Time (to generalize, any user that has a negative UTC offset),
 * the following Date object is created for "2007-05-16": Tue May 15 2007 20:00:00 GMT-0400 (Eastern Daylight Time) {}.
 *
 * By using this utility we get the following Date object: `compansateForTimezone(new Date("2007-05-16"))` = Tue May 16 2007 00:00:00 GMT-0400 (Eastern Daylight Time) {}
 *
 * @param {Date} date Date to shift
 * @return {Date} shifted Date
 */
declare function compansateForTimezone(date: Date): Date;
declare function parseTime(time: string, format?: string): string;
declare function getHourMinuteMeridiemFromTimeString(timeString: string): {
    hours: string;
    minutes: string;
    meridiem: string;
};
declare function formatTimeStringTo12hFormatWithMeridiem(timeString: string): string;
export { calculateRemainingTimeBreakdown, formatDateWithOptions, compansateForTimezone, parseTime, getHourMinuteMeridiemFromTimeString, formatTimeStringTo12hFormatWithMeridiem, sortDateRange };
