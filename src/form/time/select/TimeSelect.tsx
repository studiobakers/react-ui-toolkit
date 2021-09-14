import "./_time-select.scss";

import React, {useState} from "react";
import classNames from "classnames";

import {formatDateWithOptions} from "../../../core/utils/time/timeUtils";
import {DATE_FORMAT} from "../../../core/utils/time/timeConstants";
import {DropdownOption} from "../../../dropdown/list/item/DropdownListItem";
import TimeInput from "../input/TimeInput";
import TimeDropdown from "../dropdown/TimeDropdown";

export interface TimeSelectProps {
  onChange: (timeString: string) => void;
  startTime: Date;
  testid?: string;
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

const timeFormatter = formatDateWithOptions({
  format: DATE_FORMAT.LONG_TIME_FORMAT,
  shouldShiftDateToCompensateForTimezone: false
});

function TimeSelect({
  testid,
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
  const formattedStartTime = timeFormatter(startTime);
  const [inputValue, setInputValue] = useState(formattedStartTime);
  const [dropdownOption, setDropdownOption] = useState<DropdownOption | null>(null);

  const timeDropdownHeader = (
    <TimeInput
      testid={`${testid}.time-select`}
      name={name}
      value={inputValue}
      initialDateTime={startTime}
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
      selectedOption={dropdownOption}
      onSelect={handleSelect}
      icon={icon?.dropdown}
      hasDeselectOption={hasDeselectOption}
      isDisabled={isDisabled}
      customClassName={classNames("time-select", customClassName)}
      customHeader={timeDropdownHeader}
    />
  );

  function handleChange(timeString: string) {
    setInputValue(timeString);

    onChange(inputValue);
  }

  function handleSelect(option: DropdownOption | null) {
    setInputValue(option!.title);
    setDropdownOption(option!.context);

    onChange(inputValue);
  }
}

export default TimeSelect;
