import {SelectProps, SelectState} from "./selectTypes";

function generateInitialSelectState<IsMulti extends boolean>(
  props: SelectProps<IsMulti>
): SelectState<IsMulti> {
  return {
    focusedOptionIndex: 0,
    isMenuOpen: false,
    onSelect: props.onSelect,
    options: props.options,
    value: props.value,
    isMultiSelect: props.isMultiSelect
  };
}

export {generateInitialSelectState};
