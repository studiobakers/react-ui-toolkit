import {initialSelectState} from "./context/SelectContext";
import {SelectOwnState, SelectProps, SelectState} from "./selectTypes";

/**
 * Generates select state from provided props.
 * @param {SelectState} state - The current state of the select
 * @param props - The props passed to the select
 * @returns {SelectState} - The new state of the select
 */
function generateSelectState(state: SelectOwnState, props: SelectProps): SelectState {
  const selectState: SelectState = {
    ...initialSelectState,
    ...state,
    ...props
  };

  return selectState;
}

export {generateSelectState};
