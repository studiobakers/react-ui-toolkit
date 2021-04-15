import {
  DAY_IN_HRS,
  DAY_IN_S,
  HOUR_IN_S,
  MINUTE_IN_S,
  SECOND_IN_MS
} from "./timeConstants";
import {CountdownResults} from "./timeTypes";
import {CountdownItem} from "../../../countdown/Countdown";

function calculateRemainingTime(target: Date): CountdownResults {
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

function generateCountdownItems(
  {alwaysShowSeconds}: {alwaysShowSeconds: boolean},
  countdownData: CountdownResults
): CountdownItem[] {
  const maxDigit = 9;
  let items: CountdownItem[];

  if (countdownData.days >= 1) {
    items = [
      {
        id: "days",
        count:
          countdownData.days <= maxDigit ? `0${countdownData.days}` : countdownData.days
      },
      {
        id: "hours",
        count:
          countdownData.hours <= maxDigit
            ? `0${countdownData.hours}`
            : countdownData.hours
      },
      {
        id: "minutes",
        count:
          countdownData.minutes <= maxDigit
            ? `0${countdownData.minutes}`
            : countdownData.minutes
      }
    ];
  } else if (countdownData.hours >= 1) {
    items = [
      {
        id: "hours",
        count:
          countdownData.hours <= maxDigit
            ? `0${countdownData.hours}`
            : countdownData.hours
      },
      {
        id: "minutes",
        count:
          countdownData.minutes <= maxDigit
            ? `0${countdownData.minutes}`
            : countdownData.minutes
      }
    ];
  } else {
    items = [
      {
        id: "minutes",
        count:
          countdownData.minutes <= maxDigit
            ? `0${countdownData.minutes}`
            : countdownData.minutes
      },
      {
        id: "seconds",
        count:
          countdownData.seconds <= maxDigit
            ? `0${countdownData.seconds}`
            : countdownData.seconds
      }
    ];
  }

  if (alwaysShowSeconds && countdownData.hours >= 1) {
    items.push({id: "seconds", count: countdownData.seconds});
  }

  return items;
}

export {calculateRemainingTime, generateCountdownItems};
