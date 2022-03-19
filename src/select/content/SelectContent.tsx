import "./_select-content.scss";

import classNames from "classnames";
import React, {useRef} from "react";

import useSelectContext from "../util/hook/useSelectContext";
import useOnClickOutside from "../../core/utils/hooks/useOnClickOutside";

interface SelectContentProps {
  children: React.ReactNode;
  customClassName?: string;
}

function SelectContent({children, customClassName}: SelectContentProps) {
  const {
    selectState: {isMenuOpen},
    dispatchSelectStateAction
  } = useSelectContext();
  const selectContentRef = useRef(null);

  const selectContentClassName = classNames("select-content", customClassName, {
    "select-content--is-visible": isMenuOpen
  });

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

export default SelectContent;
