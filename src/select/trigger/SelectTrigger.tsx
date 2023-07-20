import classNames from "classnames";
import React, {forwardRef, useImperativeHandle, useRef} from "react";

import Button, {ButtonProps} from "../../button/Button";
import {useSelectContext, useSelectDispatchContext} from "../util/context/SelectContext";

import "./_select-trigger.scss";

export type SelectTriggerProps = Omit<ButtonProps, "type">;

function SelectTriggerComponent(
  {customClassName, children, onClick, onKeyDown, ...otherProps}: SelectTriggerProps,
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  const {role, isMenuOpen, isDisabled} = useSelectContext();
  const dispatchSelectStateAction = useSelectDispatchContext();
  const selectTriggerRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    ref,
    () => selectTriggerRef.current
  );

  return (
    <Button
      ref={selectTriggerRef}
      customClassName={classNames("select-trigger", customClassName)}
      aria-haspopup={role}
      aria-expanded={isMenuOpen}
      onClick={handleClick}
      {...otherProps}>
      {children}
    </Button>
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled) {
      return;
    }

    dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});

    if (onClick) {
      onClick(event);
    }
  }
}

const SelectTrigger = forwardRef(SelectTriggerComponent);

export default SelectTrigger;
