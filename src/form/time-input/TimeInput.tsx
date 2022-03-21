import React from "react";
import classNames from "classnames";

import Input from "../input/Input";
import {DATE_FORMAT} from "../../core/utils/time/timeConstants";
import {formatDateWithOptions, parseTime} from "../../core/utils/time/timeUtils";
import {InputProps} from "../input/util/inputTypes";

export type TimeInputProps = Omit<
  InputProps,
  "localizationOptions" | "onChange" | "value" | "type" | "name"
> & {
  onChange: (timeString: string) => void;
  value: string;
  initialDateTime?: Date | null;
  name?: string;
};

const timeFormatter = formatDateWithOptions({
  format: DATE_FORMAT.LONG_TIME_FORMAT,
  shouldShiftDateToCompensateForTimezone: false
});

function TimeInput({
  testid,
  initialDateTime,
  value,
  onChange,
  placeholder = "03:30 PM",
  name = "TimeInput",
  customClassName,
  ...rest
}: TimeInputProps) {
  return (
    <Input
      type={"text"}
      testid={`${testid}.input`}
      customClassName={classNames("time-input", customClassName)}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      {...rest}
    />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onChange(event.currentTarget.value);
  }

  function handleBlur() {
    let finalTimeString = parseTime(value);

    if (initialDateTime && value.length < 1) {
      finalTimeString = timeFormatter(initialDateTime);
    }

    onChange(finalTimeString);
  }
}

export default TimeInput;
