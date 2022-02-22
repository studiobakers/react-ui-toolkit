import {RemainingTimeBreakdown} from "../../core/utils/time/timeTypes";
import {DateTimerItem, DateTimerProps} from "./dateTimerTypes";

function generateDateTimerItems(
  {
    titleMap,
    alwaysShowSeconds
  }: {titleMap: DateTimerProps["titleMap"]; alwaysShowSeconds: boolean},
  dateTimerData: RemainingTimeBreakdown
): DateTimerItem[] {
  let visibleParts = [] as Array<DateTimerItem["id"]>;

  if (dateTimerData.days >= 1) {
    visibleParts = ["days", "hours", "minutes"];
  } else if (dateTimerData.hours >= 1) {
    visibleParts = ["hours", "minutes"];
  } else {
    visibleParts = ["minutes", "seconds"];
  }

  if (alwaysShowSeconds && dateTimerData.hours >= 1) {
    visibleParts.push("seconds");
  }

  return visibleParts.map((key) => ({
    id: key,
    // eslint-disable-next-line no-magic-numbers
    count: dateTimerData[key].toString().padStart(2, "0"),
    title: (titleMap ? titleMap[key] : undefined) || key
  }));
}

export {generateDateTimerItems};
