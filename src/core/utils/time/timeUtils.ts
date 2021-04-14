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
  const maxDigit = 9;
  const delta = target.getTime() - new Date().getTime();
  const deltaInSeconds = delta / SECOND_IN_MS;
  const countdownResults: CountdownResults = {
    delta,
    days: Math.floor(deltaInSeconds / DAY_IN_S),
    hours: Math.floor((deltaInSeconds / HOUR_IN_S) % DAY_IN_HRS),
    minutes: Math.floor((deltaInSeconds % HOUR_IN_S) / MINUTE_IN_S),
    seconds: Math.floor((deltaInSeconds % HOUR_IN_S) % MINUTE_IN_S)
  };

  if (countdownResults.days < 1) {
    countdownResults.days = "0";
  } else if (countdownResults.days <= maxDigit) {
    countdownResults.days = `0${countdownResults.days}`;
  }

  if (countdownResults.hours < 1) {
    countdownResults.hours = "00";
  } else if (countdownResults.hours <= maxDigit) {
    countdownResults.hours = `0${countdownResults.hours}`;
  }

  if (countdownResults.minutes < 1) {
    countdownResults.minutes = "00";
  } else if (countdownResults.minutes <= maxDigit) {
    countdownResults.minutes = `0${countdownResults.minutes}`;
  }

  if (countdownResults.seconds < 1) {
    countdownResults.seconds = "00";
  } else if (countdownResults.seconds <= maxDigit) {
    countdownResults.seconds = `0${countdownResults.seconds}`;
  }

  return countdownResults;
}

function generateCountdownItems(
  countdownData: CountdownResults,
  secondVisibility: boolean
): CountdownItem[] {
  let items: CountdownItem[];

  if (countdownData.days >= 1) {
    items = [
      {id: "days", count: countdownData.days},
      {id: "hours", count: countdownData.hours},
      {id: "minutes", count: countdownData.minutes}
    ];
  } else if (countdownData.hours >= 1) {
    items = [
      {id: "hours", count: countdownData.hours},
      {id: "minutes", count: countdownData.minutes}
    ];
  } else {
    items = [
      {id: "minutes", count: countdownData.minutes},
      {id: "seconds", count: countdownData.seconds}
    ];
  }

  if (secondVisibility && countdownData.hours >= 1) {
    items.push({id: "seconds", count: countdownData.seconds});
  }

  return items;
}

export {calculateRemainingTime, generateCountdownItems};
