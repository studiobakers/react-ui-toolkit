import {initialSelectState} from "./context/SelectContext";
import {SelectOwnState, SelectProps, SelectState} from "./selectTypes";

/**
 * Generates select state from provided props.
 * @param {SelectState} state - The current state of the select
 * @param props - The props passed to the select
 * @returns {SelectState} - The new state of the select
 */
function generateSelectState(
  state: SelectOwnState,
  props: Omit<SelectProps, "children">
): SelectState {
  return {
    ...initialSelectState,
    ...props,
    ...state
  };
}

export {generateSelectState};
