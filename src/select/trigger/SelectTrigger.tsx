import classNames from "classnames";
import React, {useEffect, useRef} from "react";

import Button, {ButtonProps} from "../../button/Button";
import useCombinedRefs from "../../core/utils/hooks/useCombinedRefs";
import useSelectContext from "../util/hook/useSelectContext";

import "./_select-trigger.scss";

export type SelectTriggerProps = Omit<ButtonProps, "type">;

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  // eslint-disable-next-line prefer-arrow-callback
  function SelectTriggerComponent(
    {customClassName, children, onClick, ...otherProps}: SelectTriggerProps,
    ref?: React.ForwardedRef<HTMLButtonElement>
  ) {
    const {
      selectState: {role, isMenuOpen, isDisabled, focusedOptionIndex},
      dispatchSelectStateAction
    } = useSelectContext();
    const innerRef = useRef<HTMLButtonElement | null>(null);
    const selectTriggerRef = useCombinedRefs(ref || null, innerRef);

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
);

export default SelectTrigger;
