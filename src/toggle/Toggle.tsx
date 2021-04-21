import "./_toggle.scss";

import React, {createContext, useState} from "react";
import classNames from "classnames";

import ToggleItem from "./item/ToggleItem";
export interface ToggleItemShape {
  id: string;
  children: React.ReactNode;
}

const ToggleContext = createContext({
  toggleState: [] as ToggleItemShape[],
  setToggleState: (() => null) as React.Dispatch<React.SetStateAction<ToggleItemShape[]>>,
  isMultiple: false,
  onToggleItem: (id: string) => id
});

export interface ToggleProps {
  children: React.ReactNode;
  onToggle: (id: string) => void;
  isMultiple?: boolean;
  position?: "vertical" | "horizontal";
  isDisabled?: boolean;
  customClassName?: string;
  testid?: string;
}

function Toggle({
  children,
  onToggle,
  isMultiple = false,
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
  const [toggleState, setToggleState] = useState<ToggleItemShape[]>([]);

  return (
    <div data-testid={testid} className={toggleClassName}>
      <ToggleContext.Provider
        value={{toggleState, setToggleState, isMultiple, onToggleItem}}>
        {children}
      </ToggleContext.Provider>
    </div>
  );

  function onToggleItem(id: string) {
    onToggle(id);

    return id;
  }
}

Toggle.Item = ToggleItem;

export {Toggle, ToggleContext};
