import "./_select-item.scss";

import classNames from "classnames";
import React, {useEffect, useLayoutEffect, useRef} from "react";

import useSelectContext from "../util/hook/useSelectContext";
import {Option, SelectItemElement} from "../util/selectTypes";

export interface SelectItemProps {
  option: Option;
  children: React.ReactNode;
  customClassName?: string;
  onKeyDown?: (option: Option, event: React.KeyboardEvent<SelectItemElement>) => void;
  as?: keyof Pick<JSX.IntrinsicElements, "div" | "li">;
}

function SelectItem({
  option,
  children,
  customClassName,
  onKeyDown,
  as: WrapperElement = "div"
}: SelectItemProps) {
  const {selectState, dispatchSelectStateAction} = useSelectContext();
  const {onSelect, value, focusedOptionIndex, shouldCloseOnSelect, options} = selectState;
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
  const optionRef = useRef<SelectItemElement | null>(null);

  useLayoutEffect(() => {
    if (isFocused && optionRef.current) {
      optionRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    dispatchSelectStateAction({type: "ADD_OPTION", payload: option});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperElement
      // @ts-ignore - we won't use align attribute so we can ignore this error
      ref={optionRef}
      className={selectItemClassName}
      role={"option"}
      id={option.id}
      tabIndex={0}
      aria-selected={isSelected}
      onClick={handleClick}
      onMouseEnter={handleFocus}
      onKeyDown={handleSelectKeyDown}
      onFocus={handleFocus}>
      {children}
    </WrapperElement>
  );

  function handleClick() {
    if (!isDisabled) {
      onSelect(option);
      dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: optionIndex});

      if (shouldCloseOnSelect) {
        dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
        dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: 0});
      }
    }
  }

  function handleSelectKeyDown(event: React.KeyboardEvent<SelectItemElement>) {
    if (onKeyDown) {
      onKeyDown(option, event);
    }
  }

  function handleFocus() {
    dispatchSelectStateAction({type: "SET_FOCUSED_OPTION_INDEX", payload: optionIndex});
  }
}

export default SelectItem;
