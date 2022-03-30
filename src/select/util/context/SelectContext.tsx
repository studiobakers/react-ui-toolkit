import {createContext, Dispatch} from "react";

import {SelectOwnState, SelectState, SelectStateAction} from "../selectTypes";

const initialSelectOwnState: SelectOwnState = {
  focusedOptionIndex: 0,
  isMenuOpen: false,
  options: []
};

const initialSelectState: SelectState = {
  isDisabled: false,
  hasError: false,
  value: null,
  onSelect: () => undefined,
  shouldCloseOnSelect: true,
  role: "listbox",
  ...initialSelectOwnState
};

function selectStateReducer(state: SelectOwnState, action: SelectStateAction) {
  let newState = state;

  switch (action.type) {
    case "TOGGLE_MENU_VISIBILITY":
      newState = {...state, isMenuOpen: !state.isMenuOpen};
      break;

    case "SET_FOCUSED_OPTION_INDEX":
      newState = {...state, focusedOptionIndex: action.payload};
      break;

    case "ADD_OPTION":
      newState = {...state, options: [...state.options, action.payload]};
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
export {selectStateReducer, initialSelectState, initialSelectOwnState};
