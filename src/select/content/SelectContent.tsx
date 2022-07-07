import "./_select-content.scss";

import classNames from "classnames";
import React, {forwardRef, useImperativeHandle, useRef} from "react";

import useSelectContext from "../util/hook/useSelectContext";
import useOnClickOutside from "../../core/utils/hooks/useOnClickOutside";

export interface SelectContentProps {
  children: React.ReactNode;
  customClassName?: string;
}

function SelectContentComponent(
  {children, customClassName}: SelectContentProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    selectState: {isMenuOpen},
    dispatchSelectStateAction
  } = useSelectContext();
  const selectContentRef = useRef<HTMLDivElement | null>(null);
  const selectContentClassName = classNames("select-content", customClassName, {
    "select-content--is-visible": isMenuOpen
  });

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => selectContentRef.current
  );

  useOnClickOutside(selectContentRef.current, handleCloseMenu);

  return (
    <div ref={selectContentRef} hidden={!isMenuOpen} className={selectContentClassName}>
      {children}
    </div>
  );

  function handleCloseMenu() {
    if (isMenuOpen) {
      dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
    }
  }
}

const SelectContent = forwardRef(SelectContentComponent);

export default SelectContent;
