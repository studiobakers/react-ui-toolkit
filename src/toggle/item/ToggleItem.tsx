import "./_toggle-item.scss";

import React from "react";
import classNames from "classnames";

import ListItem from "../../list/item/ListItem";
import {ToggleOption} from "../Toggle";

export interface ToggleItemProps {
  testid: string;
  option: ToggleOption;
  isSelected: boolean;
  onToggle: (option: ToggleOption, event?: React.SyntheticEvent<HTMLLIElement>) => void;
}

function ToggleItem({option, onToggle, isSelected, testid}: ToggleItemProps) {
  const toggleItemClassName = classNames("toggle-item", {
    "toggle-item--is-selected": isSelected,
    "toggle-item--is-disabled": option.isDisabled
  });

  return (
    <ListItem
      testid={testid}
      clickableListItemProps={{onClick: handleToggle}}
      customClassName={toggleItemClassName}>
      <div className={"toggle-item__icon"}>{option.icon}</div>

      <div className={"toggle-item__content"}>{option.title}</div>
    </ListItem>
  );

  function handleToggle() {
    onToggle(option);
  }
}

export default ToggleItem;
