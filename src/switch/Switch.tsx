import "./_switch.scss";

import React from "react";
import classNames from "classnames";

export interface SwitchProps {
  onToggle: () => void;
  isToggledOn: boolean;
  isDisabled?: boolean;
  customClassName?: string;
  testid?: string;
}

function Switch({
  onToggle,
  isToggledOn,
  isDisabled,
  customClassName,
  testid
}: SwitchProps) {
  const switchClassName = classNames("switch", customClassName);

  return (
    <label data-testid={testid} className={switchClassName}>
      <input
        className={"switch__controller"}
        type="checkbox"
        checked={isDisabled ? false : isToggledOn}
        onChange={onToggle}
      />

      <span
        className={classNames("switch__slider", {
          "switch__slider--is-disabled": isDisabled
        })}
      />
    </label>
  );
}

export default Switch;
