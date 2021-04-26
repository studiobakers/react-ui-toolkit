import {initialToastState} from "./toastConstants";
import {ToastAction} from "./toastTypes";

function toastReducer(
  state: typeof initialToastState,
  action: ToastAction
): typeof initialToastState {
  let newState = state;

  switch (action.type) {
    case "DISPLAY": {
      newState = {
        isDisplayed: true,
        data: {...initialToastState.data, ...action.payload}
      };
      break;
    }

    case "HIDE": {
      newState = {...initialToastState};
      break;
    }

    default:
      break;
  }

  return newState;
}

export default toastReducer;
