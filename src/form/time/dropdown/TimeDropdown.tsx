import "./_time-dropdown.scss";

import React, {useEffect, useState} from "react";
import classNames from "classnames";

import Dropdown from "../../../dropdown/Dropdown";
import {DropdownOption} from "../../../dropdown/list/item/DropdownListItem";
import {generateTimeDropdownOptions} from "./util/timeDropdownUtils";

export type TimeDropdownOption = DropdownOption<
  string,
  {date: Date; differenceInMinutes: number}
>;

export interface TimeDropdownProps {
  testid: string;
  selectedOption: null | TimeDropdownOption;
  onSelect: (option: null | TimeDropdownOption) => void;
  startDate?: Date;
  startTimeString?: string;
  customHeader?: React.ReactNode;
  icon?: React.ReactNode;
  hasDeselectOption?: boolean;
  isDisabled?: boolean;
  customClassName?: string;
}

function TimeDropdown({
  testid,
  startDate,
  startTimeString,
  selectedOption,
  customHeader,
  onSelect,
  icon,
  hasDeselectOption,
  isDisabled,
  customClassName
}: TimeDropdownProps) {
  const [options, setOptions] = useState<TimeDropdownOption[]>(
    generateTimeDropdownOptions({startTime: startTimeString, startDate})
  );

  useEffect(() => {
    setOptions(generateTimeDropdownOptions({startTime: startTimeString, startDate}));
  }, [startTimeString, startDate]);

  return (
    <Dropdown
      role={"listbox"}
      testid={testid}
      customClassName={classNames("time-dropdown", customClassName, {
        "time-dropdown--has-selected-option": selectedOption
      })}
      options={options}
      selectedOption={selectedOption}
      onSelect={onSelect}
      hasDeselectOption={hasDeselectOption}
      isDisabled={isDisabled}
      header={
        customHeader || (
          <div className={"time-dropdown-header"}>
            <span className={"time-dropdown-header__title"}>
              {selectedOption?.title || "Select time"}
            </span>

            {selectedOption?.subtitle && (
              <span className={"time-dropdown-header__subtitle"}>
                {selectedOption.subtitle}
              </span>
            )}

            {icon}
          </div>
        )
      }
    />
  );
}

export default TimeDropdown;
