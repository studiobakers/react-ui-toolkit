import "./_time-select.scss";

import React, {useEffect, useState} from "react";
import classNames from "classnames";

import Input from "../../input/Input";
import {formatDateWithOptions, parseTime} from "../../../core/utils/time/timeUtils";
import {DATE_FORMAT} from "../../../core/utils/time/timeConstants";
import Dropdown from "../../../dropdown/Dropdown";
import {DropdownOption} from "../../../dropdown/list/item/DropdownListItem";
import {generateTimeDropdownOptions} from "../dropdown/util/timeDropdownUtils";

export type TimeSelectDropdownOption = DropdownOption<
  string,
  {date: Date; differenceInMinutes: number}
>;

export interface TimeSelectProps {
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

function TimeSelect({
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
}: TimeSelectProps) {
  const timeInputClassName = classNames("time-select", customClassName);
  const timeStringOfDate = selectedDate
    ? formatDateWithOptions({
        format: DATE_FORMAT.LONG_TIME_FORMAT,
        shouldShiftDateToCompensateForTimezone: false
      })(selectedDate)
    : "";
  const formattedStartTime = startTime
    ? formatDateWithOptions({
        format: DATE_FORMAT.LONG_TIME_FORMAT,
        shouldShiftDateToCompensateForTimezone: false
      })(startTime)
    : undefined;
  const [dropdownOptions, setDropdownOptions] = useState(
    generateTimeDropdownOptions({
      startTime: formattedStartTime,
      startDate: selectedDate
    })
  );
  const [value, setValue] = useState({
    input: timeStringOfDate,
    dropdown: null
  });

  useEffect(() => {
    setDropdownOptions(generateTimeDropdownOptions({startTime: formattedStartTime}));
  }, [formattedStartTime]);

  const dropdownHeader = (
    <Input
      type={"text"}
      testid={`${testid}.time-select`}
      customClassName={"time-select__header"}
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

export default TimeSelect;
