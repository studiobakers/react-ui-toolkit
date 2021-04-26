import "./_toggle.scss";

import React, {useCallback, useState} from "react";
import classNames from "classnames";

import ToggleItem from "./item/ToggleItem";
import {ToggleContext} from "./util/ToggleContext";

export interface ToggleProps {
  children: React.ReactNode;
  onToggle?: (dataId: string) => void;
  selectedItems?: string[];
  isMultiple?: boolean;
  position?: "vertical" | "horizontal";
  isDisabled?: boolean;
  customClassName?: string;
}

function Toggle({
  children,
  onToggle,
  isMultiple = false,
  selectedItems = [],
  position = "horizontal",
  isDisabled,
  customClassName
}: ToggleProps) {
  const toggleClassName = classNames("toggle", customClassName, {
    "toggle--is-horizontal": position === "horizontal",
    "toggle--is-vertical": position === "vertical",
    "toggle--is-disabled": isDisabled
  });
  const [selectedToggleItemsState, setSelectedToggleItemsState] = useState<string[]>(
    selectedItems
  );

  const onToggleItem = useCallback(
    (dataId: string) => {
      if (onToggle) {
        onToggle(dataId);
        return;
      }

      if (isMultiple) {
        if (selectedToggleItemsState.some((item) => item === dataId)) {
          setSelectedToggleItemsState([
            ...selectedToggleItemsState.filter((item) => item !== dataId)
          ]);
        } else {
          setSelectedToggleItemsState([...selectedToggleItemsState, dataId]);
        }
      } else {
        setSelectedToggleItemsState([dataId]);
      }
    },
    [onToggle, selectedToggleItemsState, setSelectedToggleItemsState, isMultiple]
  );

  return (
    <ul className={toggleClassName}>
      <ToggleContext.Provider
        value={{
          selectedToggleItemsState,
          onToggleItem
        }}>
        {children}
      </ToggleContext.Provider>
    </ul>
  );
}

Toggle.Item = ToggleItem;

export {Toggle, ToggleContext};
