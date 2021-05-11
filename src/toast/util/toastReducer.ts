import {updateAtIndex} from "../../core/utils/array/arrayUtils";
import {initialToastState} from "./toastConstants";
import {ToastAction} from "./toastTypes";
import {isDifferentToast, isSameToast} from "./toastUtils";

type ToastState = typeof initialToastState;

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  let newState = state;

  switch (action.type) {
    case "DISPLAY": {
      const {toastData} = action;

      newState = {
        toastStack: [
          ...state.toastStack.filter(isDifferentToast(toastData.id)),
          toastData
        ]
      };
      break;
    }

    case "HIDE": {
      newState = {
        toastStack: state.toastStack.filter(isDifferentToast(action.toastId))
      };
      break;
    }

    case "HIDE_ALL": {
      newState = {
        toastStack: []
      };
      break;
    }

    case "UPDATE": {
      const currentIndex = state.toastStack.findIndex(isSameToast(action.toastId));

      if (currentIndex > -1) {
        newState = {
          toastStack: updateAtIndex(state.toastStack, currentIndex, {
            ...state.toastStack[currentIndex],
            ...action.toastData
          })
        };
      } else {
        throw new Error("Trying to update a Toast that is already removed");
      }

      break;
    }

    default:
      break;
  }

  return newState;
}

export default toastReducer;
