import classNames from "classnames";

import {SelectContextValue} from "../selectTypes";

/**
 * A hook that returns the class name for the select component.
 * @param state - Select state
 * @param customClassName - Custom class name
 * @returns {string} - Select container className according to the provided state object
 * @example
 * const selectClassName = useSelectClassName(state, customClassName);
 * <div className={selectClassName} ... />
 */
function useSelectClassName(state: SelectContextValue, customClassName?: string) {
  const {isMenuOpen, value, hasError, isDisabled} = state;
  const isMultiSelect = Array.isArray(value);

  return classNames("select", customClassName, {
    "select--is-disabled": isDisabled,
    "select--is-multi-select": isMultiSelect,
    "select--has-selected-option": Array.isArray(value) ? Boolean(value.length) : Boolean(value),
    "select--has-error": hasError,
    "select--is-open": isMenuOpen
  });
}

export default useSelectClassName;
