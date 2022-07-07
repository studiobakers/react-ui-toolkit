import "./_select-item.scss";

import classNames from "classnames";
import React, {
  ForwardedRef,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from "react";

import useSelectContext from "../util/hook/useSelectContext";
import {SelectItemElement, Option} from "../util/selectTypes";

export interface SelectItemProps<T extends Option = Option> {
  option: T;
  children: React.ReactNode;
  customClassName?: string;
  onKeyDown?: (option: T, event: React.KeyboardEvent<SelectItemElement>) => void;
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

  useImperativeHandle<SelectItemElement | null, SelectItemElement | null>(
    ref,
    () => optionRef.current,
    []
  );

  useLayoutEffect(() => {
    if (isFocused && optionRef.current) {
      optionRef.current.focus();
    }
  }, [isFocused, optionRef]);

  useEffect(() => {
    dispatchSelectStateAction({type: "ADD_OPTION", payload: option});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperElement
      // @ts-ignore - ref prop is compatible
      ref={optionRef}
      className={selectItemClassName}
      role={"option"}
      id={option.id}
      tabIndex={isDisabled ? -1 : 0}
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
      dispatchSelectStateAction({
        type: "SET_FOCUSED_OPTION_INDEX",
        payload: optionIndex
      });

      if (shouldCloseOnSelect) {
        dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
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

const SelectItem = forwardRef(SelectItemComponent);

export default SelectItem as <T extends Option = Option>(
  props: SelectItemProps<T> & {ref?: Ref<SelectItemElement>}
) => JSX.Element;
