import "./_time-select.scss";

import React, {useState} from "react";
import classNames from "classnames";

import {formatDateWithOptions} from "../../../core/utils/time/timeUtils";
import {DATE_FORMAT} from "../../../core/utils/time/timeConstants";
import {DropdownOption} from "../../../dropdown/list/item/DropdownListItem";
import TimeInput from "../input/TimeInput";
import TimeDropdown from "../dropdown/TimeDropdown";

export type TimeSelectDropdownOption = DropdownOption<
  string,
  {date: Date; differenceInMinutes: number}
>;

export interface TimeSelectProps {
  onChange: (timeString: string) => void;
  startTime: Date;
  testid: string;
  selectedDate?: Date | null;
  customClassName?: string;
  isDisabled?: boolean;
  placeholder?: string;
  hasDeselectOption?: boolean;
  name?: string;
  icon?: {
    input?: React.ReactNode;
    dropdown?: React.ReactNode;
  };
  hasError?: boolean;
}

function TimeSelect({
  testid,
  selectedDate,
  onChange,
  startTime,
  customClassName,
  hasDeselectOption,
  isDisabled = false,
  placeholder = "03:30 PM",
  name = "",
  icon,
  hasError
}: TimeSelectProps) {
  const timeStringOfDate = selectedDate
    ? formatDateWithOptions({
        format: DATE_FORMAT.LONG_TIME_FORMAT,
        shouldShiftDateToCompensateForTimezone: false
      })(selectedDate)
    : "";
  const formattedStartTime = formatDateWithOptions({
    format: DATE_FORMAT.LONG_TIME_FORMAT,
    shouldShiftDateToCompensateForTimezone: false
  })(startTime);
  const [value, setValue] = useState({
    input: timeStringOfDate,
    dropdown: null
  });

  const timeDropdownHeader = (
    <TimeInput
      testid={`${testid}.time-select`}
      name={name}
      selectedDate={selectedDate}
      onChange={handleChange}
      placeholder={placeholder}
      icon={icon?.input}
      hasError={hasError}
    />
  );

  return (
    <TimeDropdown
      testid={`${testid}.time-dropdown`}
      startTimeString={formattedStartTime}
      selectedOption={value.dropdown}
      onSelect={handleSelect}
      icon={icon?.dropdown}
      hasDeselectOption={hasDeselectOption}
      isDisabled={isDisabled}
      customClassName={classNames("time-select", customClassName)}
      customHeader={timeDropdownHeader}
    />
  );

  function handleChange(timeString: string) {
    setValue({...value, input: timeString});

    onChange(value.input);
  }

  function handleSelect(option: DropdownOption | null) {
    setValue({
      input: option!.title,
      dropdown: option!.context
    });
  }
}

export default TimeSelect;
