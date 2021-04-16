import {RemainingTimeBreakdown} from "../../core/utils/time/timeTypes";
import {CountdownItem} from "../Countdown";

function generateCountdownItems(
  {alwaysShowSeconds}: {alwaysShowSeconds: boolean},
  countdownData: RemainingTimeBreakdown
): CountdownItem[] {
  let items: CountdownItem[];

  if (countdownData.days >= 1) {
    items = [
      {
        id: "days",
        count: countdownData.days.toString().padStart(2, "0")
      },
      {
        id: "hours",
        count: countdownData.hours.toString().padStart(2, "0")
      },
      {
        id: "minutes",
        count: countdownData.minutes.toString().padStart(2, "0")
      }
    ];
  } else if (countdownData.hours >= 1) {
    items = [
      {
        id: "hours",
        count: countdownData.hours.toString().padStart(2, "0")
      },
      {
        id: "minutes",
        count: countdownData.minutes.toString().padStart(2, "0")
      }
    ];
  } else {
    items = [
      {
        id: "minutes",
        count: countdownData.minutes.toString().padStart(2, "0")
      },
      {
        id: "seconds",
        count: countdownData.seconds.toString().padStart(2, "0")
      }
    ];
  }

  if (alwaysShowSeconds && countdownData.hours >= 1) {
    items.push({id: "seconds", count: countdownData.seconds});
  }

  return items;
}

export {generateCountdownItems};
