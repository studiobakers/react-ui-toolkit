import {SelectProps, SelectState} from "./selectTypes";

function generateSelectStateFromProps(
  state: SelectState,
  props: Omit<SelectProps, "children" | "role">
): SelectState {
  return {
    ...state,
    ...props
  };
}

export {generateSelectStateFromProps};
