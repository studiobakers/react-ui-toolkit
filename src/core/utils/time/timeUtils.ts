import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import timezonedFormat from "date-fns-tz/format";
import formatWithOptions from "date-fns/fp/formatWithOptions";
import enCA from "date-fns/locale/en-CA";

import {
  DATE_FORMAT,
  DAY_IN_HRS,
  DAY_IN_S,
  HH_MM_A_TIME_FORMAT_REGEX,
  HOUR_IN_S,
  MINUTE_IN_MS,
  MINUTE_IN_S,
  SECOND_IN_MS
} from "./timeConstants";
import {FormatDateUtilOptions, RemainingTimeBreakdown} from "./timeTypes";

function calculateRemainingTimeBreakdown(target: Date): RemainingTimeBreakdown {
  const delta = target.getTime() - new Date().getTime();
  const deltaInSeconds = delta / SECOND_IN_MS;

  return {
    delta,
    days: Math.floor(deltaInSeconds / DAY_IN_S),
    hours: Math.floor((deltaInSeconds / HOUR_IN_S) % DAY_IN_HRS),
    minutes: Math.floor((deltaInSeconds % HOUR_IN_S) / MINUTE_IN_S),
    seconds: Math.floor((deltaInSeconds % HOUR_IN_S) % MINUTE_IN_S)
  };
}

/**
 * Formats a Date object into a human friendly string
 *
 * Note on usage:
 *    Whenever the timezone information is not available and a date object that is passed to this function is generated from a ISO-8601 date string (yyyy-MM-dd), `shouldShiftDateToCompensateForTimezone` option should be set to `true`.
 *    Otherwise, the displayed date would be inconsistent with the data. For example, for a user with Eastern Daylight Time (to generalize, any user that has a negative UTC offset), the following Date object is created for "2007-05-16": Tue May 15 2007 20:00:00 GMT-0400 (Eastern Daylight Time) {}. Therefore, 15 May appears on the screen. By passing `new Date("2007-05-16")` value to `compensateForTimezone` utility, we fix this problem.
 *    When the timezone information is passed to `formatDateWithOptions`, this extra compensation is redundant as `date-fns-tz/utcToZonedTime` handles it corrently.
 *
 * @param {object} options FormatDateUtilOptions
 * @return {string} Formatted date
 */
function formatDateWithOptions(options: FormatDateUtilOptions) {
  const {
    format = DATE_FORMAT.DEFAULT,
    shouldShiftDateToCompensateForTimezone = true,
    isProvidedDateInUTC = true,
    timeZone
  } = options || {};

  return (date: Date): string => {
    let dateToFormat = date;

    if (timeZone && isProvidedDateInUTC) {
      dateToFormat = utcToZonedTime(date, timeZone);
    } else if (!timeZone && shouldShiftDateToCompensateForTimezone) {
      dateToFormat = compansateForTimezone(date);
    }

    return timeZone
      ? timezonedFormat(dateToFormat, format, {
          locale: enCA,
          timeZone
        })
      : formatWithOptions({locale: enCA}, format)(dateToFormat);
  };
}

/**
 * Shifts the time of the Date object by the system's UTC offset to avoid timezone issues.
 *
 * For example, for a user with Eastern Daylight Time (to generalize, any user that has a negative UTC offset), the following Date object is created for "2007-05-16": Tue May 15 2007 20:00:00 GMT-0400 (Eastern Daylight Time) {}.
 * By using this utility we get the following Date object: `compansateForTimezone(new Date("2007-05-16"))` = Tue May 16 2007 00:00:00 GMT-0400 (Eastern Daylight Time) {}
 *
 * @param {Date} date Date to shift
 * @return {Date} shifted Date
 */
function compansateForTimezone(date: Date): Date {
  // `Date.prototype.getTimezoneOffset` returns a value signed according to the locale timezone offset. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
  return new Date(date.getTime() - date.getTimezoneOffset() * -1 * MINUTE_IN_MS);
}

/* eslint-disable no-magic-numbers */
// eslint-disable-next-line complexity
function parseTime(time: string, format = "g:i A") {
  const num = time.replace(/[^0-9]/g, "");

  let hour;
  let minute;
  let isPM = time.match(/p/i) !== null;

  // Parse for hour and minute
  switch (num.length) {
    case 4: {
      hour = parseInt(num[0] + num[1], 10);
      minute = parseInt(num[2] + num[3], 10);
      break;
    }

    case 3: {
      hour = parseInt(num[0], 10);
      minute = parseInt(num[1] + num[2], 10);
      break;
    }

    case 2:
    case 1: {
      hour = parseInt(num[0] + (num[1] || ""), 10);
      minute = 0;
      break;
    }

    default:
      return "";
  }

  // Make sure hour is in 24 hour format
  if (isPM && hour > 0 && hour < 12) {
    hour += 12;
  }

  // Force pm for hours between 13:00 and 23:00
  if (hour >= 13 && hour <= 23) {
    isPM = true;
  }

  // Keep within range
  if (hour <= 0 || hour >= 24) {
    hour = 0;
  }
  if (minute < 0 || minute > 59) {
    minute = 0;
  }

  // Format output
  return (
    format
      // 12 hour without leading 0
      .replace(/g/g, hour === 0 ? "12" : "g")
      .replace(
        /g/g,
        hour > 12
          ? (hour - 12).toString().padStart(2, "0")
          : hour.toString().padStart(2, "0")
      )
      // 24 hour without leading 0
      .replace(/G/g, String(hour))
      // 12 hour with leading 0
      .replace(
        /h/g,
        String(
          // eslint-disable-next-line no-nested-ternary
          hour.toString().length > 1
            ? hour > 12
              ? hour - 12
              : hour
            : `0${hour > 12 ? hour - 12 : hour}`
        )
      )
      // 24 hour with leading 0
      .replace(/H/g, String(hour.toString().length > 1 ? hour : `0${hour}`))
      // minutes with leading zero
      .replace(/i/g, String(minute.toString().length > 1 ? minute : `0${minute}`))
      // simulate seconds
      .replace(/s/g, "00")
      // lowercase am/pm
      .replace(/a/g, isPM ? "pm" : "am")
      // lowercase am/pm
      .replace(/A/g, isPM ? "PM" : "AM")
  );
}

function getHourMinuteMeridiemFromTimeString(timeString: string) {
  const timeParts = timeString.match(HH_MM_A_TIME_FORMAT_REGEX);
  const defaultTime = {hours: "10", minutes: "00", meridiem: "AM"};

  return timeParts
    ? {
        hours: timeParts[2],
        minutes: timeParts[3],
        meridiem: timeParts[4]
      }
    : defaultTime;
}

function formatTimeStringTo12hFormatWithMeridiem(timeString: string) {
  const {hours, minutes, meridiem} = getHourMinuteMeridiemFromTimeString(timeString);

  return `${hours}:${minutes} ${meridiem}`;
}

function getHourMinuteMeridiemFromDate(date: Date) {
  const hours = (date.getHours() % 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const meridiem = date.getHours() >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${meridiem}`;
}
/* eslint-enable no-magic-numbers */

export {
  calculateRemainingTimeBreakdown,
  formatDateWithOptions,
  compansateForTimezone,
  parseTime,
  getHourMinuteMeridiemFromTimeString,
  formatTimeStringTo12hFormatWithMeridiem,
  getHourMinuteMeridiemFromDate
};
