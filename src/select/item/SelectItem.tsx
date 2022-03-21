import "./_select-item.scss";

import classNames from "classnames";
import React, {useLayoutEffect, useRef} from "react";

import useSelectContext from "../util/hook/useSelectContext";
import {Option} from "../util/selectTypes";

interface SelectItemProps {
  option: Option;
  children: React.ReactNode;
  customClassName?: string;
  onKeyDown?: (option: Option, event: React.KeyboardEvent<HTMLDivElement>) => void;
}

function SelectItem({option, children, customClassName, onKeyDown}: SelectItemProps) {
  const {selectState, dispatchSelectStateAction} = useSelectContext();
  const {onSelect, value, focusedOptionIndex, options, shouldCloseOnSelect} = selectState;
  const {isDisabled} = option;
  const optionIndex = options.findIndex((opt) => opt.id === option.id);
  const isSelected = Array.isArray(value)
    ? Boolean(value.find((currentOption) => currentOption.id === option.id))
    : value?.id === option.id;
  const isFocused = focusedOptionIndex === optionIndex;

  const selectItemClassName = classNames("select-item", customClassName, {
    "select-item--is-disabled": isDisabled,
    "select-item--is-selected": isSelected,
    "select-item--is-focused": isFocused
  });
  const optionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (isFocused && optionRef.current) {
      optionRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div
      ref={optionRef}
      className={selectItemClassName}
      role={"option"}
      tabIndex={0}
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleSelectKeyDown}
      onFocus={handleFocus}>
      {children}
    </div>
  );

  function handleClick() {
    if (!isDisabled && !isSelected) {
      onSelect(option);
      dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: optionIndex});

      if (shouldCloseOnSelect) {
        dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
        dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: 0});
      }
    }
  }

  function handleSelectKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (onKeyDown) {
      onKeyDown(option, event);
    }
  }

  function handleFocus() {
    dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: optionIndex});
  }
}

export default SelectItem;
