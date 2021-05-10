import {initialToastStackState, initialToastState} from "./toastConstants";
import {ToastAction} from "./toastTypes";

function toastReducer(
  state: typeof initialToastStackState,
  action: ToastAction
): typeof initialToastStackState {
  let newState = state;

  switch (action.type) {
    case "DISPLAY": {
      newState = {
        toastItems: [...state.toastItems, {...initialToastState, ...action.payload}]
      };

      break;
    }

    case "HIDE": {
      newState = {
        toastItems: [
          ...state.toastItems.filter(
            (item) => item.customToastId !== action.payload?.customToastId
          )
        ]
      };

      break;
    }

    default:
      break;
  }

  return newState;
}

export default toastReducer;
