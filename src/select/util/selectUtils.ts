import {SelectProps, SelectState} from "./selectTypes";

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
