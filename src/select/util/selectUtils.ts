import {SelectOwnState, SelectProps, SelectContextValue} from "./selectTypes";

/**
 * Generates select state from provided props.
 * @param {SelectContextValue} state - The current state of the select
 * @param props - The props passed to the select
 * @returns {SelectContextValue} - The new state of the select
 */
function generateSelectState(
  state: SelectOwnState,
  props: SelectProps
): SelectContextValue {
  const selectState: SelectContextValue = {
    isDisabled: props.isDisabled ?? false,
    hasError: props.hasError ?? false,
    value: props.value || null,
    onSelect: props.onSelect,
    shouldCloseOnSelect: props.shouldCloseOnSelect ?? true,
    role: props.role ?? "listbox",
    ...state
  };

  return selectState;
}

export {generateSelectState};
