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
  const {selectedToggleItemsState, onToggleItem} = useToggle();
  const isSelected = selectedToggleItemsState.some((item) => item === dataId);
  const toggleItemClassName = classNames("toggle-item", customClassName, {
    "toggle-item--is-selected": isSelected,
    "toggle-item--is-disabled": isDisabled
  });

  return (
    <ListItem
      testid={testid}
      customClassName={toggleItemClassName}
      clickableListItemProps={isDisabled ? undefined : {onClick: handleToggle}}>
      {children}
    </ListItem>
  );

  function handleToggle() {
    onToggleItem(dataId);
  }
}

export default ToggleItem;
