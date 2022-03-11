import "./_select-item.scss";

import classNames from "classnames";
import React from "react";

import useSelectContext from "../util/hook/useSelectContext";
import {Option} from "../util/selectTypes";

interface SelectItemProps {
  option: Option;
  children: React.ReactNode;
  customClassName?: string;
}

function SelectItem({option, children, customClassName}: SelectItemProps) {
  const {
    selectState: {onSelect, selectedOptions, focusedOptionIndex, options},
    dispatchSelectStateAction
  } = useSelectContext();
  const {isDisabled} = option;
  const optionIndex = options.findIndex((opt) => opt.id === option.id);
  const isSelected = selectedOptions.includes(option);
  const selectItemClassName = classNames("select-item", customClassName, {
    "select-item--is-disabled": isDisabled,
    "select-item--is-selected": isSelected,
    "select-item--is-focused": focusedOptionIndex === optionIndex
  });

  return (
    <div
      className={selectItemClassName}
      role={"option"}
      tabIndex={0}
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}>
      {children}
    </div>
  );

  function handleClick() {
    if (!isDisabled) {
      onSelect(option);
      dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: optionIndex});
    }
  }

  function handleFocus() {
    console.log("focussss");
    dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: optionIndex});
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    //
  }
}

export default SelectItem;
