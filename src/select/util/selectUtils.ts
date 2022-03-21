import {SelectProps, SelectState} from "./selectTypes";

/**
 * Generates select state from provided props.
 * @param {SelectState} state - The current state of the select
 * @param props - The props passed to the select
 * @returns {SelectState} - The new state of the select
 */
function generateSelectStateFromProps(
  state: SelectState,
  props: Omit<SelectProps, "children">
): SelectState {
  return {
    ...state,
    ...props
  };
}

export {generateSelectStateFromProps};
