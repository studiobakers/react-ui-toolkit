import "./_time-input.scss";

import React, {useEffect, useState} from "react";
import classNames from "classnames";

import Input from "../input/Input";
import {generateTimeInputDropdownOptions} from "./util/timeInputUtils";
import {
  formatDateWithOptions,
  getHourMinuteMeridiemFromDate,
  parseTime
} from "../../core/utils/time/timeUtils";
import {DATE_FORMAT} from "../../core/utils/time/timeConstants";
import Dropdown from "../../dropdown/Dropdown";
import {DropdownOption} from "../../dropdown/list/item/DropdownListItem";

export type TimeInputDropdownOption = DropdownOption<
  string,
  {date: Date; differenceInMinutes: number}
>;

export interface TimeInputProps {
  onChange: (timeString: string) => void;
  testid?: string;
  selectedDate?: Date | null;
  startTime?: Date;
  customClassName?: string;
  isDisabled?: boolean;
  placeholder?: string;
  name?: string;
  icon?: React.ReactNode;
  hasError?: boolean;
}

function TimeInput({
  testid,
  selectedDate,
  onChange,
  startTime,
  customClassName,
  isDisabled = false,
  placeholder = "03:30 PM",
  name = "",
  icon,
  hasError
}: TimeInputProps) {
  const timeInputClassName = classNames("time-input", customClassName);
  const timeStringOfDate = selectedDate
    ? formatDateWithOptions({
        format: DATE_FORMAT.LONG_TIME_FORMAT,
        shouldShiftDateToCompensateForTimezone: false
      })(selectedDate)
    : "";
  const formattedStartTime = startTime
    ? getHourMinuteMeridiemFromDate(startTime)
    : undefined;
  const [dropdownOptions, setDropdownOptions] = useState(
    generateTimeInputDropdownOptions({
      startTime: formattedStartTime,
      startDate: selectedDate
    })
  );
  const [value, setValue] = useState({
    input: timeStringOfDate,
    dropdown: null
  });

  useEffect(() => {
    setDropdownOptions(generateTimeInputDropdownOptions({startTime: formattedStartTime}));
  }, [startTime]);

  const dropdownHeader = (
    <Input
      type={"text"}
      testid={`${testid}.time-input`}
      customClassName={"time-input__header"}
      name={name}
      value={value.input}
      placeholder={placeholder}
      isDisabled={isDisabled}
      onChange={handleChange}
      onBlur={handleBlur}
      hasError={hasError}
      rightIcon={icon}
    />
  );

  return (
    <Dropdown
      customClassName={timeInputClassName}
      headerWithoutButton={dropdownHeader}
      role={"listbox"}
      onSelect={handleSelect}
      options={dropdownOptions}
      isDisabled={isDisabled}
      selectedOption={value.dropdown}
    />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    setValue({...value, input: event.currentTarget.value});
  }

  function handleSelect(option: DropdownOption | null) {
    setValue({
      input: option!.title,
      dropdown: option!.context
    });
  }

  function handleBlur() {
    const formattedTimeString = parseTime(value.input);

    onChange(formattedTimeString);
    setValue({...value, input: formattedTimeString});
  }
}

export default TimeInput;
