import "./_select-trigger.scss";

import classNames from "classnames";
import React from "react";

import Button, {ButtonProps} from "../../button/Button";
import useSelectContext from "../util/hook/useSelectContext";

type SelectTriggerProps = ButtonProps;

function SelectTrigger({customClassName, children, ...otherProps}: SelectTriggerProps) {
  const {selectState, dispatchSelectStateAction} = useSelectContext();

  console.log(selectState);

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
