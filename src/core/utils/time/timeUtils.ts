import {
  DAY_IN_HRS,
  DAY_IN_S,
  HOUR_IN_S,
  MINUTE_IN_S,
  SECOND_IN_MS
} from "./timeConstants";
import {RemainingTimeBreakdown} from "./timeTypes";

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

export {calculateRemainingTimeBreakdown};
