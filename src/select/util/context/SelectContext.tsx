import {createContext, Dispatch} from "react";

import {initialSelectState} from "../selectConstants";
import {SelectState, SelectStateAction} from "../selectTypes";

function selectStateReducer<IsMulti extends boolean>(
  state: SelectState<IsMulti>,
  action: SelectStateAction
) {
  let newState = state;

  switch (action.type) {
    case "TOGGLE_MENU_VISIBILITY":
      newState = {...state, isMenuOpen: !state.isMenuOpen};
      break;

    case "SET_FOCUSED_OPTION_INDEX":
      newState = {...state, focusedOptionIndex: action.payload};
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
export {selectStateReducer};
