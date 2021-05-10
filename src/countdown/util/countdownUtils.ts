import {RemainingTimeBreakdown} from "../../core/utils/time/timeTypes";
import {CountdownItem, CountdownProps} from "./countdownTypes";

/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
function generateCountdownItems(
  {
    titleMap,
    alwaysShowSeconds
  }: {titleMap: CountdownProps["titleMap"]; alwaysShowSeconds: boolean},
  countdownData: RemainingTimeBreakdown
): CountdownItem[] {
  let items: CountdownItem[];

  if (countdownData.days >= 1) {
    items = [
      {
        id: "days",
        count: countdownData.days.toString().padStart(2, "0"),
        title: titleMap?.day || "days"
      },
      {
        id: "hours",
        count: countdownData.hours.toString().padStart(2, "0"),
        title: titleMap?.hour || "hours"
      },
      {
        id: "minutes",
        count: countdownData.minutes.toString().padStart(2, "0"),
        title: titleMap?.minute || "minutes"
      }
    ];
  } else if (countdownData.hours >= 1) {
    items = [
      {
        id: "hours",
        count: countdownData.hours.toString().padStart(2, "0"),
        title: titleMap?.hour || "hours"
      },
      {
        id: "minutes",
        count: countdownData.minutes.toString().padStart(2, "0"),
        title: titleMap?.minute || "minutes"
      }
    ];
  } else {
    items = [
      {
        id: "minutes",
        count: countdownData.minutes.toString().padStart(2, "0"),
        title: titleMap?.minute || "minutes"
      },
      {
        id: "seconds",
        count: countdownData.seconds.toString().padStart(2, "0"),
        title: titleMap?.second || "seconds"
      }
    ];
  }

  if (alwaysShowSeconds && countdownData.hours >= 1) {
    items.push({
      id: "seconds",
      count: countdownData.seconds.toString().padStart(2, "0"),
      title: titleMap?.second || "seconds"
    });
  }

  return items;
}
/* eslint-enable complexity */
/* eslint-enable no-magic-numbers */

export {generateCountdownItems};
