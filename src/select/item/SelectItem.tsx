import CheckIcon from "../../ui/icons/check.svg";

import "./_select-item.scss";

import classNames from "classnames";
import React, {
  ForwardedRef,
  forwardRef,
  Ref,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from "react";

import {SelectItemElement, Option} from "../util/selectTypes";
import {useSelectContext, useSelectDispatchContext} from "../util/context/SelectContext";

export interface SelectItemProps<T extends Option = Option> {
  option: T | null;
  children: React.ReactNode;
  customClassName?: string;
  onKeyDown?: (option: T | null, event: React.KeyboardEvent<SelectItemElement>) => void;
  as?: keyof Pick<JSX.IntrinsicElements, "div" | "li">;
}

function SelectItemComponent<T extends Option = Option>(
  {
    option,
    children,
    customClassName,
    onKeyDown,
    as: WrapperElement = "div"
  }: SelectItemProps<T>,
  ref?: ForwardedRef<SelectItemElement>
) {
  const selectState = useSelectContext();
  const dispatchSelectStateAction = useSelectDispatchContext();
  const {onSelect, value, focusedOptionIndex, shouldCloseOnSelect, options, isMenuOpen} =
    selectState;
  const optionIndex = options.findIndex((opt) => opt?.id === option?.id);
  const isSelected = Array.isArray(value)
    ? Boolean(value.find((currentOption) => currentOption.id === option?.id))
    : value?.id === option?.id;
  const isFocused = focusedOptionIndex === optionIndex;
  const selectItemClassName = classNames("select-item", customClassName, {
    "select-item--is-disabled": option?.isDisabled,
    "select-item--is-selected": isSelected,
    "select-item--is-focused": isFocused
  });
  const optionRef = useRef<SelectItemElement | null>(null);

  useImperativeHandle<SelectItemElement | null, SelectItemElement | null>(
    ref,
    () => optionRef.current,
    []
  );

  useLayoutEffect(() => {
    if (isFocused && optionRef.current) {
      optionRef.current.focus();
    }
  }, [isFocused]);

  return (
    <WrapperElement
      // @ts-ignore - ref prop is compatible
      ref={optionRef}
      className={selectItemClassName}
      role={"option"}
      id={option?.id}
      tabIndex={option?.isDisabled ? -1 : 0}
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleSelectKeyDown}>
      {children} {isSelected && <CheckIcon />}
    </WrapperElement>
  );

  function handleClick() {
    if (!option?.isDisabled) {
      onSelect(option);
      dispatchSelectStateAction({
        type: "SET_FOCUSED_OPTION_INDEX",
        payload: optionIndex
      });

      if (shouldCloseOnSelect && isMenuOpen) {
        dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
      }
    }
  }

  function handleSelectKeyDown(event: React.KeyboardEvent<SelectItemElement>) {
    if (onKeyDown) {
      onKeyDown(option, event);
    }
  }
}

const SelectItem = forwardRef(SelectItemComponent);

export default SelectItem as <T extends Option = Option>(
  props: SelectItemProps<T> & {ref?: Ref<SelectItemElement>}
) => JSX.Element;
