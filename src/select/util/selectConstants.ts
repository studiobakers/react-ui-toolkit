import {SelectState} from "./selectTypes";

const initialSelectState: SelectState = {
  focusedOptionIndex: 0,
  isMenuOpen: false,
  onSelect: () => undefined,
  options: [],
  value: [],
  isMultiSelect: true
};

export {initialSelectState};
