import classNames from "classnames";
import React from "react";

import Button, {ButtonProps} from "../../button/Button";
import useSelectContext from "../util/hook/useSelectContext";

import "./_select-trigger.scss";

type SelectTriggerProps = Omit<ButtonProps, "onClick">;

function SelectTrigger({customClassName, children, ...otherProps}: SelectTriggerProps) {
  const {dispatchSelectStateAction} = useSelectContext();

  return (
    <Button
      customClassName={classNames("select-trigger", customClassName)}
      onClick={handleToggleMenuVisibility}
      {...otherProps}>
      {children}
    </Button>
  );

  function handleToggleMenuVisibility() {
    dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
  }
}

export default SelectTrigger;
