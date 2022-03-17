import React from "react";
import classNames from "classnames";

import Input from "../input/Input";
import {DATE_FORMAT} from "../../core/utils/time/timeConstants";
import {formatDateWithOptions, parseTime} from "../../core/utils/time/timeUtils";

export interface TimeInputProps {
  testid: string;
  onChange: (timeString: string) => void;
  value: string;
  initialDateTime?: Date | null;
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
  value,
  onChange,
  isDisabled = false,
  placeholder = "03:30 PM",
  name = "",
  icon,
  customClassName,
  hasError
}: TimeInputProps) {
  return (
    <Input
      type={"text"}
      testid={`${testid}.input`}
      customClassName={classNames("time-input", customClassName)}
      name={name}
      value={initialDateTime ? timeFormatter(initialDateTime) : value}
      placeholder={placeholder}
      isDisabled={isDisabled}
      onChange={handleChange}
      onBlur={handleBlur}
      hasError={hasError}
      rightIcon={icon}
    />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onChange(event.currentTarget.value);
  }

  function handleBlur() {
    const formattedTimeString = parseTime(value);

    onChange(formattedTimeString);
  }
}

export default TimeInput;
