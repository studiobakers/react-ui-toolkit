import "./_date-timer.scss";

import React, {useEffect} from "react";
import classNames from "classnames";

import useDateTimer from "../core/utils/hooks/useDateTimer";
import List from "../list/List";
import ListItem from "../list/item/ListItem";
import {generateDateTimerItems} from "./util/dateTimerUtils";
import {DateTimerProps} from "./util/dateTimerTypes";
import {sortDateRange} from "../core/utils/time/timeUtils";
import {SECOND_IN_MS} from "../core/utils/time/timeConstants";

function DateTimer({
  testid,
  range,
  timerInterval = 1 /* in seconds */,
  timerType = "down",
  alwaysShowSeconds = false,
  titleMap,
  onEnd,
  customClassName
}: DateTimerProps) {
  const dateTimerData = useDateTimer({
    range,
    cadence: timerInterval * SECOND_IN_MS,
    timerType,
    onEnd
  });
  const items = generateDateTimerItems({titleMap, alwaysShowSeconds}, dateTimerData);

  // Validate the `range` prop according to the `timerType` prop
  useEffect(() => {
    const [originDate] = sortDateRange([range[0], range[1] || new Date()]);

    if (timerType === "up" && originDate.getTime() > new Date().getTime()) {
      console.error("`timerType` is `up` but `range` is not in the past", range);
    }

    if (timerType === "down" && originDate.getTime() < new Date().getTime()) {
      console.error("`timerType` is `down` but `range` is not in the future", range);
    }
  }, [range, timerType]);

  return (
    <List
      customClassName={classNames("date-timer", customClassName)}
      testid={testid}
      items={items}
    >
      {(item, itemTestId) => (
        <ListItem customClassName={"date-timer-box"}>
          <p
            data-testid={`${itemTestId}.${item.id}.count`}
            className={"date-timer-box__count"}
          >
            {item.count}
          </p>

          <p
            data-testid={`${itemTestId}.${item.id}.title`}
            className={"date-timer-box__title"}
          >
            {item.title}
          </p>
        </ListItem>
      )}
    </List>
  );
}

export default DateTimer;
