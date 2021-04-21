import "./_toggle-item.scss";

import React from "react";
import classNames from "classnames";

import {useToggle} from "../util/toggleHooks";

export interface ToggleItemProps {
  children: React.ReactNode;
  id: string;
  customClassName?: string;
  isDisabled?: boolean;
}

function ToggleItem({children, id, customClassName, isDisabled}: ToggleItemProps) {
  const {toggleState, setToggleState, isMultiple, onToggleItem} = useToggle();
  const isSelected = Boolean(toggleState.find((item) => item.id === id));
  const toggleItemClassName = classNames("toggle-item", customClassName, {
    "toggle-item--is-selected": isSelected,
    "toggle-item--is-disabled": isDisabled
  });

  return (
    <div className={toggleItemClassName} onClick={handleToggle}>
      {children}
    </div>
  );

  function handleToggle() {
    if (isMultiple) {
      if (isSelected) {
        setToggleState([...toggleState.filter((item) => item.id !== id)]);
      } else {
        setToggleState([...toggleState, {id, children}]);
      }
    } else {
      setToggleState([{id, children}]);
    }

    onToggleItem(id);
  }
}

export default ToggleItem;
