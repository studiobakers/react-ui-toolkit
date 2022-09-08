import {SelectOwnState, SelectStateAction} from "../selectTypes";

function selectStateReducer(state: SelectOwnState, action: SelectStateAction) {
  let newState = state;

  switch (action.type) {
    case "TOGGLE_MENU_VISIBILITY":
      newState = {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        focusedOptionIndex: -1
      };

      break;

    case "SET_FOCUSED_OPTION_INDEX":
      newState = {...state, focusedOptionIndex: action.payload};
      break;

    default:
      break;
  }

  return newState;
}

export {selectStateReducer};
