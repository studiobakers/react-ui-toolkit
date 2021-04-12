import {
  DAY_IN_HRS,
  DAY_IN_S,
  HOUR_IN_S,
  MINUTE_IN_S,
  SECOND_IN_MS
} from "./timeConstants";
import {CountDownResults} from "./timeTypes";

function calculateRemainingTime(target: Date): CountDownResults {
  const maxDigit = 9;
  const delta = target.getTime() - new Date().getTime();
  const deltaInSeconds = delta / SECOND_IN_MS;
  const countDownResults: CountDownResults = {
    delta,
    days: Math.floor(deltaInSeconds / DAY_IN_S),
    hours: Math.floor((deltaInSeconds / HOUR_IN_S) % DAY_IN_HRS),
    minutes: Math.floor((deltaInSeconds % HOUR_IN_S) / MINUTE_IN_S),
    seconds: Math.floor((deltaInSeconds % HOUR_IN_S) % MINUTE_IN_S)
  };

  if (countDownResults.days < 1) {
    countDownResults.days = "0";
  } else if (countDownResults.days <= maxDigit) {
    countDownResults.days = `0${countDownResults.days}`;
  }

  if (countDownResults.hours < 1) {
    countDownResults.hours = "00";
  } else if (countDownResults.hours <= maxDigit) {
    countDownResults.hours = `0${countDownResults.hours}`;
  }

  if (countDownResults.minutes < 1) {
    countDownResults.minutes = "00";
  } else if (countDownResults.minutes <= maxDigit) {
    countDownResults.minutes = `0${countDownResults.minutes}`;
  }

  if (countDownResults.seconds < 1) {
    countDownResults.seconds = "00";
  } else if (countDownResults.seconds <= maxDigit) {
    countDownResults.seconds = `0${countDownResults.seconds}`;
  }

  return countDownResults;
}

export {calculateRemainingTime};
