import "./_select-content.scss";

import classNames from "classnames";
import {type ForwardedRef, type ReactNode, forwardRef} from "react";

import {useSelectContext} from "../util/context/SelectContext";

export interface SelectContentProps {
  children: ReactNode;
  customClassName?: string;
}

function SelectContentComponent(
  {children, customClassName}: SelectContentProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {isMenuOpen} = useSelectContext();
  const selectContentClassName = classNames("select-content", customClassName, {
    "select-content--is-visible": isMenuOpen
  });

  return (
    <div ref={ref} hidden={!isMenuOpen} className={selectContentClassName}>
      {children}
    </div>
  );
}

const SelectContent = forwardRef(SelectContentComponent);

export default SelectContent;
