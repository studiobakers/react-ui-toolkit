import classNames from "classnames";
import React from "react";

import Button, {ButtonProps} from "../../button/Button";
import useSelectContext from "../util/hook/useSelectContext";

import "./_select-trigger.scss";

type SelectTriggerProps = Omit<ButtonProps, "type">;

function SelectTrigger({
  customClassName,
  children,
  onClick,
  ...otherProps
}: SelectTriggerProps) {
  const {dispatchSelectStateAction} = useSelectContext();

  //  TODO: Improve focus handling (automatically focus when menu is closed)
  return (
    <Button
      customClassName={classNames("select-trigger", customClassName)}
      type={"button"}
      onClick={handleClick}
      {...otherProps}>
      {children}
    </Button>
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});

    if (onClick) {
      onClick(event);
    }
  }
}

export default SelectTrigger;
