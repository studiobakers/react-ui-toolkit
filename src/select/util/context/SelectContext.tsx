import {createContext, Dispatch} from "react";

import {SelectState, SelectStateAction} from "../selectTypes";

const initialSelectState: SelectState = {
  focusedOptionIndex: 0,
  isMenuOpen: false,
  isDisabled: false,
  hasError: false,
  value: null,
  options: [],
  onSelect: () => undefined,
  shouldCloseOnSelect: true,
  role: "listbox"
};

function selectStateReducer(state: SelectState, action: SelectStateAction) {
  let newState = state;

  switch (action.type) {
    case "TOGGLE_MENU_VISIBILITY":
      if (!state.isDisabled) {
        newState = {...state, isMenuOpen: !state.isMenuOpen};
      }
      break;

    case "SET_FOCUSED_OPTION_INDEX":
      newState = {...state, focusedOptionIndex: action.payload};
      break;

    case "SET_SELECT_STATE":
      newState = {...state, ...action.payload};
      break;

    default:
      break;
  }

  return newState;
}

const SelectContext = createContext({
  selectState: initialSelectState,
  dispatchSelectStateAction: (() => undefined) as Dispatch<SelectStateAction>
});

SelectContext.displayName = "SelectContext";

export default SelectContext;
export {selectStateReducer, initialSelectState};
