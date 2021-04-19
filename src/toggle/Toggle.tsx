import "./_toggle.scss";

import React from "react";

import {DropdownOption} from "../dropdown/list/item/DropdownListItem";
import ToggleItem from "./item/ToggleItem";
import List from "../list/List";
import classNames from "classnames";

export type ToggleOption = Omit<DropdownOption, "subtitle">;

export interface ToggleProps {
  options: ToggleOption[];
  selectedOptions: ToggleOption[];
  onToggle: (option: ToggleOption, event?: React.SyntheticEvent<HTMLLIElement>) => void;
  position?: "vertical" | "horizontal";
  isDisabled?: boolean;
  customClassName?: string;
  testid?: string;
}

function Toggle({
  options,
  selectedOptions,
  onToggle,
  position = "horizontal",
  isDisabled,
  customClassName,
  testid
}: ToggleProps) {
  const toggleClassName = classNames("toggle", customClassName, {
    "toggle--is-horizontal": position === "horizontal",
    "toggle--is-vertical": position === "vertical",
    "toggle--is-disabled": isDisabled
  });

  return (
    <List testid={testid} items={options} customClassName={toggleClassName}>
      {(option, testid) => (
        <ToggleItem
          testid={testid}
          option={option}
          onToggle={onToggle}
          isSelected={
            selectedOptions.length
              ? Boolean(
                  selectedOptions.find(
                    (selectedOption) => selectedOption.id === option.id
                  )
                )
              : false
          }
        />
      )}
    </List>
  );
}

export default Toggle;
