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
  onEnd?: () => void;
  customClassName?: string;
}

function Countdown({
  testid,
  startDate,
  onEnd,
  countDownIntervalInSeconds = 1,
  customClassName
}: CountdownProps) {
  const countDownData = useCountDownTimer(startDate, countDownIntervalInSeconds);
  let items: {id: "days" | "hours" | "minutes" | "seconds"; count: string | number}[];

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

          <p className={"countdown-box__title"}>{item.id}</p>
        </ListItem>
      )}
    </List>
  );
}

export default Countdown;
