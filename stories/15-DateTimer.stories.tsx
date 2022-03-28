import {storiesOf} from "@storybook/react";
import React from "react";

import DateTimer from "../src/date-timer/DateTimer";
import StoryFragment from "./utils/StoryFragment";

storiesOf("DateTimer", module).add("DateTimer", () => (
  <StoryFragment>
    <span>{"Between Tomorrow and 3 Days Later"}</span>

    <DateTimer
      range={[calculateFutureDate(1, "day"), calculateFutureDate(3, "day")]}
      alwaysShowSeconds={true}
      onEnd={handleDateTimerEnd}
    />

    <DateTimer
      range={[calculateFutureDate(1, "day"), calculateFutureDate(3, "day")]}
      titleMap={{
        days: "d",
        hours: "h",
        minutes: "m",
        seconds: "s"
      }}
      alwaysShowSeconds={true}
      onEnd={handleDateTimerEnd}
    />

    <hr />

    <span>{"Since `Jan 10 2022` - timerType=`up`"}</span>

    <DateTimer
      range={[new Date("Jan 10 2022")]}
      alwaysShowSeconds={true}
      onEnd={handleDateTimerEnd}
      timerType={"up"}
    />

    <hr />

    <span>{"1 Day Later - Show Seconds - timerInterval=`5`"}</span>

    <DateTimer
      range={[calculateFutureDate(1, "day")]}
      alwaysShowSeconds={true}
      onEnd={handleDateTimerEnd}
      timerInterval={5}
    />

    <hr />

    <span>{"17 Hours Later"}</span>

    <DateTimer
      range={[calculateFutureDate(17, "hour")]}
      alwaysShowSeconds={true}
      onEnd={handleDateTimerEnd}
    />

    <hr />

    <span>{"1 Minute Later"}</span>

    <DateTimer range={[calculateFutureDate(1, "minute")]} onEnd={handleDateTimerEnd} />

    <hr />

    <span>{"10 Seconds Later"}</span>

    <DateTimer range={[calculateFutureDate(10, "second")]} onEnd={handleDateTimerEnd} />

    <span>{"10 Seconds Later with 5s timer interval"}</span>

    <DateTimer
      range={[calculateFutureDate(10, "second")]}
      onEnd={handleDateTimerEnd}
      timerInterval={5}
    />
  </StoryFragment>
));

function calculateFutureDate(value: number, unit: "day" | "hour" | "minute" | "second") {
  let currentDate = new Date();

  if (unit === "day") {
    currentDate.setDate(currentDate.getDate() + value);
  } else if (unit === "hour") {
    currentDate.setHours(currentDate.getHours() + value);
  } else if (unit === "minute") {
    currentDate.setMinutes(currentDate.getMinutes() + value);
  } else {
    currentDate.setSeconds(currentDate.getSeconds() + value);
  }

  return new Date(currentDate);
}

function handleDateTimerEnd() {
  console.log("onEnd function triggered");
}
