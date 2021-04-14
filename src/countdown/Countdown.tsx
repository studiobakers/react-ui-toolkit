import "./_countdown.scss";

import React, {useLayoutEffect} from "react";
import classNames from "classnames";

import useCountdownTimer from "../core/utils/hooks/useCountdownTimer";
import List from "../list/List";
import ListItem from "../list/item/ListItem";
import {generateCountdownItems} from "../core/utils/time/timeUtils";

export interface CountdownProps {
  testid: string;
  startDate: Date;
  countDownIntervalInSeconds?: number;
  alwaysShowSeconds?: boolean;
  onEnd?: () => void;
  customClassName?: string;
}

export interface CountdownItem {
  id: "days" | "hours" | "minutes" | "seconds";
  count: string | number;
}

function Countdown({
  testid,
  startDate,
  countDownIntervalInSeconds = 1,
  alwaysShowSeconds = false,
  onEnd,
  customClassName
}: CountdownProps) {
  const countdownData = useCountdownTimer(startDate, countDownIntervalInSeconds);
  let items = generateCountdownItems(countdownData, alwaysShowSeconds);

  useLayoutEffect(() => {
    if (countdownData.delta <= 0 && onEnd) {
      onEnd();
    }
  }, [countdownData.delta, onEnd]);

  return (
    <List
      customClassName={classNames("countdown", customClassName)}
      testid={testid}
      items={items}>
      {(item, itemTestId) => (
        <ListItem customClassName={"countdown-box"}>
          <p
            data-testid={`${itemTestId}.${item.id}.count`}
            className={"countdown-box__count"}>
            {item.count}
          </p>

          <p
            data-testid={`${itemTestId}.${item.id}.title`}
            className={"countdown-box__title"}>
            {item.id}
          </p>
        </ListItem>
      )}
    </List>
  );
}

export default Countdown;
