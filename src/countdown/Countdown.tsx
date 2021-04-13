import "./_countdown.scss";

import React, {useLayoutEffect} from "react";
import classNames from "classnames";

import useCountDownTimer from "../core/utils/hooks/useCountdownTimer";
import List from "../list/List";
import ListItem from "../list/item/ListItem";

export interface CountdownProps {
  testid: string;
  startDate: Date;
  countDownIntervalInSeconds?: number;
  alwaysShowSeconds?: boolean;
  onEnd?: () => void;
  customClassName?: string;
}

interface CountDownItem {
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
  const countDownData = useCountDownTimer(startDate, countDownIntervalInSeconds);
  let items: CountDownItem[] = [];

  if (countDownData.days >= 1) {
    items = [
      {id: "days", count: countDownData.days},
      {id: "hours", count: countDownData.hours},
      {id: "minutes", count: countDownData.minutes}
    ];
  } else if (countDownData.hours >= 1) {
    items = [
      {id: "hours", count: countDownData.hours},
      {id: "minutes", count: countDownData.minutes}
    ];
  } else {
    items = [
      {id: "minutes", count: countDownData.minutes},
      {id: "seconds", count: countDownData.seconds}
    ];
  }

  if (alwaysShowSeconds && countDownData.hours >= 1) {
    items.push({id: "seconds", count: countDownData.seconds});
  }

  useLayoutEffect(() => {
    if (countDownData.delta <= 0 && onEnd) {
      onEnd();
    }
  }, [countDownData.delta, onEnd]);

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
