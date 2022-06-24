import "./_select-content.scss";

import classNames from "classnames";
import React, {useRef} from "react";

import useSelectContext from "../util/hook/useSelectContext";
import useOnClickOutside from "../../core/utils/hooks/useOnClickOutside";
import useCombinedRefs from "../../core/utils/hooks/useCombinedRefs";

export interface SelectContentProps {
  children: React.ReactNode;
  customClassName?: string;
}
const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  // eslint-disable-next-line prefer-arrow-callback
  function SelectContentComponent({children, customClassName}: SelectContentProps, ref) {
    const {
      selectState: {isMenuOpen},
      dispatchSelectStateAction
    } = useSelectContext();
    const innerRef = useRef<HTMLDivElement | null>(null);
    const selectContentRef = useCombinedRefs(ref || null, innerRef);
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
);

export default SelectContent;
