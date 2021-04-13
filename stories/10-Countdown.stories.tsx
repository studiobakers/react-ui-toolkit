import {storiesOf} from "@storybook/react";
import React from "react";

import Countdown from "../src/countdown/Countdown";
import StoryFragment from "./utils/StoryFragment";

function calculateFutureDate(value: number, unit: "day" | "hour" | "minute") {
  let currentDate = new Date();

  if (unit === "day") {
    currentDate.setDate(currentDate.getDate() + value);
  } else if (unit === "hour") {
    currentDate.setHours(currentDate.getHours() + value);
  } else {
    currentDate.setMinutes(currentDate.getMinutes() + value);
  }

  return new Date(currentDate);
}

storiesOf("Countdown", module).add("Countdown", () => (
  <StoryFragment>
    <span>{"14 Days Later"}</span>

    <Countdown
      testid={"EventRemainingTime"}
      startDate={calculateFutureDate(14, "day")}
      onEnd={() => console.log("onEnd function triggered")}
    />

    <hr />

    <span>{"1 Day Later - Show Seconds"}</span>

    <Countdown
      testid={"EventRemainingTime"}
      startDate={calculateFutureDate(1, "day")}
      alwaysShowSeconds={true}
      onEnd={() => console.log("onEnd function triggered")}
    />

    <hr />

    <span>{"17 Hours Later"}</span>

    <Countdown
      testid={"EventRemainingTime"}
      startDate={calculateFutureDate(17, "hour")}
      onEnd={() => console.log("onEnd function triggered")}
    />

    <hr />

    <span>{"35 Minutes Later"}</span>

    <Countdown
      testid={"EventRemainingTime"}
      startDate={calculateFutureDate(35, "minute")}
      onEnd={() => console.log("onEnd function triggered")}
    />

    <hr />

    <span>{"1 Minute Later"}</span>

    <Countdown
      testid={"EventRemainingTime"}
      startDate={calculateFutureDate(1, "minute")}
      onEnd={() => console.log("onEnd function triggered")}
    />
  </StoryFragment>
));
