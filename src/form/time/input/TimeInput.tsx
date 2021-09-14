import React, {useState} from "react";
import classNames from "classnames";

import Input from "../../input/Input";
import {DATE_FORMAT} from "../../../core/utils/time/timeConstants";
import {formatDateWithOptions, parseTime} from "../../../core/utils/time/timeUtils";
import {getTimeInputValue} from "./util/timeInputUtils";

export interface TimeInputProps {
  testid: string;
  onChange: (timeString: string) => void;
  initialDateTime?: Date | null;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  name?: string;
  icon?: React.ReactNode;
  hasError?: boolean;
  customClassName?: string;
}

const timeFormatter = formatDateWithOptions({
  format: DATE_FORMAT.LONG_TIME_FORMAT,
  shouldShiftDateToCompensateForTimezone: false
});

function TimeInput({
  testid,
  initialDateTime,
  value = initialDateTime ? timeFormatter(initialDateTime) : "",
  onChange,
  isDisabled = false,
  placeholder = "03:30 PM",
  name = "",
  icon,
  customClassName,
  hasError
}: TimeInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    initialDateTime ? timeFormatter(initialDateTime) : ""
  );
  const isControlledValueDefined = typeof value !== "undefined";

  return (
    <Input
      type={"text"}
      testid={`${testid}.input`}
      customClassName={classNames("time-input", customClassName)}
      name={name}
      value={getTimeInputValue(
        {controlled: value, uncontrolled: uncontrolledValue},
        initialDateTime
      )}
      placeholder={placeholder}
      isDisabled={isDisabled}
      onChange={handleChange}
      onBlur={handleBlur}
      hasError={hasError}
      rightIcon={icon}
    />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const eventValue = event.currentTarget.value;

    onChange(eventValue);

    if (!isControlledValueDefined) {
      setUncontrolledValue(eventValue);
    }
  }

  function handleBlur() {
    const formattedTimeString = parseTime(value || uncontrolledValue);

    onChange(formattedTimeString);

    if (!isControlledValueDefined) {
      setUncontrolledValue(formattedTimeString);
    }
  }
}

export default TimeInput;
