import "./_countdown.scss";

import React, {useLayoutEffect, useRef} from "react";
import classNames from "classnames";

import useCountdownTimer from "../core/utils/hooks/useCountdownTimer";
import List from "../list/List";
import ListItem from "../list/item/ListItem";
import {generateCountdownItems} from "../core/utils/time/timeUtils";

export interface CountdownProps {
  startDate: Date;
  testid?: string;
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
  const items = generateCountdownItems({alwaysShowSeconds}, countdownData);
  const savedOnEndCallback = useRef<CountdownProps["onEnd"]>();

  useLayoutEffect(() => {
    savedOnEndCallback.current = onEnd;
  }, [onEnd]);

  useLayoutEffect(() => {
    if (countdownData.delta <= 0 && savedOnEndCallback.current) {
      savedOnEndCallback.current();
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
