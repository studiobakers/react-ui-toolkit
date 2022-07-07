import classNames from "classnames";
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from "react";

import Button, {ButtonProps} from "../../button/Button";
import useSelectContext from "../util/hook/useSelectContext";

import "./_select-trigger.scss";

export type SelectTriggerProps = Omit<ButtonProps, "type">;

function SelectTriggerComponent(
  {customClassName, children, onClick, ...otherProps}: SelectTriggerProps,
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    selectState: {role, isMenuOpen, isDisabled, focusedOptionIndex},
    dispatchSelectStateAction
  } = useSelectContext();
  const selectTriggerRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    ref,
    () => selectTriggerRef.current
  );

  useEffect(() => {
    if (focusedOptionIndex === -1) {
      selectTriggerRef.current?.focus();
    }
  }, [focusedOptionIndex, selectTriggerRef]);

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
    if (!isDisabled) {
      dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});

      if (onClick) {
        onClick(event);
      }
    }
  }
}

const SelectTrigger = forwardRef(SelectTriggerComponent);

export default SelectTrigger;
