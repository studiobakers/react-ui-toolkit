import "./_toggle-item.scss";

import React from "react";
import classNames from "classnames";

import {useToggle} from "../util/toggleHooks";
import ListItem from "../../list/item/ListItem";

export interface ToggleItemProps {
  children: React.ReactNode;
  id: string;
  customClassName?: string;
  isDisabled?: boolean;
}

function ToggleItem({children, id, customClassName, isDisabled}: ToggleItemProps) {
  const {
    selectedToggleItemsState,
    setSelectedToggleItemsState,
    isMultiple,
    onToggleItem
  } = useToggle();
  const isSelected = selectedToggleItemsState.some((item) => item.id === id);
  const toggleItemClassName = classNames("toggle-item", customClassName, {
    "toggle-item--is-selected": isSelected,
    "toggle-item--is-disabled": isDisabled
  });

  return (
    <ListItem
      customClassName={toggleItemClassName}
      clickableListItemProps={{onClick: handleToggle}}>
      {children}
    </ListItem>
  );

  function handleToggle() {
    if (isMultiple) {
      if (isSelected) {
        setSelectedToggleItemsState([
          ...selectedToggleItemsState.filter((item) => item.id !== id)
        ]);
      } else {
        setSelectedToggleItemsState([...selectedToggleItemsState, {id, children}]);
      }
    } else {
      setSelectedToggleItemsState([{id, children}]);
    }

    onToggleItem(id);
  }
}

export default ToggleItem;
