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
  const switchClassName = classNames("switch", customClassName, {
    "switch--is-disabled": isDisabled
  });

  return (
    <label data-testid={testid} className={switchClassName}>
      <input
        className={"switch__controller"}
        type={"checkbox"}
        checked={isToggledOn}
        disabled={isDisabled}
        onChange={onToggle}
        role={"switch"}
        aria-checked={isToggledOn}
        aria-readonly={isDisabled}
      />

      <span className={"switch__slider"} />
    </label>
  );
}

export default Switch;
