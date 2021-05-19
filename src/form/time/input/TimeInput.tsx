import React, {useState} from "react";
import classNames from "classnames";

import Input from "../../input/Input";
import {DATE_FORMAT} from "../../../core/utils/time/timeConstants";
import {formatDateWithOptions, parseTime} from "../../../core/utils/time/timeUtils";

export interface TimeInputProps {
  testid: string;
  onChange: (timeString: string) => void;
  selectedDate?: Date | null;
  isDisabled?: boolean;
  placeholder?: string;
  name?: string;
  icon?: React.ReactNode;
  hasError?: boolean;
  customClassName?: string;
}

function TimeInput({
  testid,
  selectedDate,
  onChange,
  isDisabled = false,
  placeholder = "03:30 PM",
  name = "",
  icon,
  customClassName,
  hasError
}: TimeInputProps) {
  const timeStringOfDate = selectedDate
    ? formatDateWithOptions({
        format: DATE_FORMAT.LONG_TIME_FORMAT,
        shouldShiftDateToCompensateForTimezone: false
      })(selectedDate)
    : "";
  const [value, setValue] = useState(timeStringOfDate);

  return (
    <Input
      type={"text"}
      testid={`${testid}.input`}
      customClassName={classNames("time-input", customClassName)}
      name={name}
      value={value}
      placeholder={placeholder}
      isDisabled={isDisabled || !selectedDate}
      onChange={handleChange}
      onBlur={handleBlur}
      hasError={hasError}
      rightIcon={icon}
    />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function handleBlur() {
    const formattedTimeString = parseTime(value);

    onChange(formattedTimeString);
    setValue(formattedTimeString);
  }
}

export default TimeInput;
