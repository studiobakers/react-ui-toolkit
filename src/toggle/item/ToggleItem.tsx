import "./_toggle-item.scss";

import React from "react";
import classNames from "classnames";

import {useToggle} from "../util/ToggleContext";
import ListItem from "../../list/item/ListItem";

export interface ToggleItemProps {
  children: React.ReactNode;
  dataId: string;
  customClassName?: string;
  isDisabled?: boolean;
  testid?: string;
}

function ToggleItem({
  children,
  dataId,
  customClassName,
  isDisabled,
  testid
}: ToggleItemProps) {
  const {selectedItems, onToggle, canSelectMultiple} = useToggle();
  const isSelected = selectedItems.includes(dataId);
  const toggleItemClassName = classNames("toggle-item", customClassName, {
    "toggle-item--is-selected": isSelected,
    "toggle-item--is-disabled": isDisabled
  });

  return (
    <ListItem testid={testid} customClassName={toggleItemClassName}>
      <label className={"toggle-item__label"}>
        <input
          type={canSelectMultiple ? "checkbox" : "radio"}
          className={"toggle-input"}
          checked={isSelected}
          disabled={isDisabled}
          onChange={handleToggle}
          onClick={handleToggle}
        />
        {children}
      </label>
    </ListItem>
  );

  function handleToggle() {
    let newSelectedItems: string[];

    if (canSelectMultiple) {
      if (selectedItems.includes(dataId)) {
        newSelectedItems = selectedItems.filter((item) => item !== dataId);
      } else {
        newSelectedItems = [...selectedItems, dataId];
      }
    } else if (selectedItems.includes(dataId)) {
      newSelectedItems = [];
    } else {
      newSelectedItems = [dataId];
    }

    onToggle(newSelectedItems);
  }
}

export default ToggleItem;
