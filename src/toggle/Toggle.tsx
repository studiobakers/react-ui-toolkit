import "./_toggle.scss";

import React from "react";
import classNames from "classnames";

import ToggleItem from "./item/ToggleItem";
import {ToggleContext} from "./util/ToggleContext";

export interface ToggleProps {
  children: React.ReactNode;
  onToggle: (selectedItems: string[]) => void;
  selectedItems: string[];
  canSelectMultiple?: boolean;
  position?: "vertical" | "horizontal";
  isDisabled?: boolean;
  customClassName?: string;
}

function Toggle({
  children,
  onToggle,
  selectedItems = [],
  canSelectMultiple = false,
  position = "horizontal",
  isDisabled,
  customClassName
}: ToggleProps) {
  const toggleClassName = classNames("toggle", customClassName, {
    "toggle--is-horizontal": position === "horizontal",
    "toggle--is-vertical": position === "vertical",
    "toggle--is-disabled": isDisabled
  });

  return (
    <ul className={toggleClassName}>
      <ToggleContext.Provider
        value={{
          selectedItems,
          onToggle,
          canSelectMultiple
        }}>
        {children}
      </ToggleContext.Provider>
    </ul>
  );
}

Toggle.Item = ToggleItem;

export {Toggle, ToggleContext};
