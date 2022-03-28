import {DateTimerProps, TimerType} from "../../../date-timer/util/dateTimerTypes";
import {
  DAY_IN_HRS,
  DAY_IN_S,
  HOUR_IN_S,
  MINUTE_IN_S,
  SECOND_IN_MS
} from "./timeConstants";
import {RemainingTimeBreakdown} from "./timeTypes";

function sortDateRange(initialRange: Date[]): Date[] {
  const range = [initialRange[0], initialRange[1]];

  return range.sort((left, right) => left.getTime() - right.getTime());
}

function calculateRemainingTimeBreakdown(
  range: DateTimerProps["range"],
  intervalCount = 0,
  timerType = "down" as TimerType
): RemainingTimeBreakdown {
  let originDate;
  let targetDate;

  if (range.length > 1 || timerType === "up") {
    [originDate, targetDate] = sortDateRange([range[0], range[1] || new Date()]);
  } else {
    targetDate = range[0];
    originDate = new Date();
  }

  const delta = targetDate.getTime() - originDate.getTime();

  const deltaInSeconds = (delta - intervalCount) / SECOND_IN_MS;

  return {
    delta,
    days: Math.floor(deltaInSeconds / DAY_IN_S),
    hours: Math.floor((deltaInSeconds / HOUR_IN_S) % DAY_IN_HRS),
    minutes: Math.floor((deltaInSeconds % HOUR_IN_S) / MINUTE_IN_S),
    seconds: Math.floor((deltaInSeconds % HOUR_IN_S) % MINUTE_IN_S)
  };
}

export {sortDateRange, calculateRemainingTimeBreakdown};
