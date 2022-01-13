import React from "react";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";

import DateTimer from "./DateTimer";
import {DateTimerProps} from "./util/dateTimerTypes";

const TWO = 2;

// TODO: Add test cases
describe("<DateTimer />", () => {
  const twoDaysLater = new Date(new Date().setDate(new Date().getDate() + TWO));
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - TWO));

  const defaultDateTimerProps: DateTimerProps = {
    testid: "date-timer",
    range: [twoDaysLater],
    timerType: "down"
  };

  it("should render correctly when timerType is `down` and the date is in the future", () => {
    render(<DateTimer {...defaultDateTimerProps} />);
  });

  it("should render correctly when timerType is `up` and the date is in the past", () => {
    render(
      <DateTimer {...defaultDateTimerProps} range={[twoDaysAgo]} timerType={"up"} />
    );
  });
});
