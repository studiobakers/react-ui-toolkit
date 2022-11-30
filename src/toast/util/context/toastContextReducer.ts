import {
  limitArrayLengthFromTheEnd,
  updateAtIndex
} from "../../../core/utils/array/arrayUtils";
import {not} from "../../../core/utils/function/functionUtils";
import {isNonNegativeNumber} from "../../../core/utils/number/numberUtils";
import {ToastAction} from "../context/toastContextTypes";
import {initialToastState} from "../toastConstants";
import {isSameToast} from "../toastUtils";

type ToastState = typeof initialToastState;

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  let newState = state;

  switch (action.type) {
    case "DISPLAY": {
      const {toastData} = action;
      const newToastStack = [
        ...state.toastStack.filter(not(isSameToast(toastData.id))),
        toastData
      ];

      newState = {
        ...state,
        toastStack: limitArrayLengthFromTheEnd(state.limit, newToastStack)
      };
      break;
    }

    case "HIDE": {
      newState = {
        ...state,
        toastStack: state.toastStack.filter(not(isSameToast(action.toastId)))
      };
      break;
    }

    case "HIDE_ALL": {
      newState = {
        ...state,
        toastStack: []
      };
      break;
    }

    case "UPDATE": {
      const currentIndex = state.toastStack.findIndex(isSameToast(action.toastId));

      if (currentIndex > -1) {
        newState = {
          ...state,
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

    case "SET_LIMIT": {
      const {limit} = action;

      newState = {
        ...state,
        limit,
        toastStack: limitArrayLengthFromTheEnd(limit, state.toastStack)
      };
      break;
    }

    case "SET_AUTO_CLOSE": {
      newState = {
        ...state,
        autoCloseToasts: action.autoCloseToasts
      };
      break;
    }

    case "SET_DEFAULT_AUTO_CLOSE_TIMEOUT_FOR_ALL_TOASTS": {
      const {timeout} = action;

      if (isNonNegativeNumber(timeout)) {
        newState = {
          ...state,
          defaultAutoCloseTimeout: timeout
        };
      }
      break;
    }

    default:
      break;
  }

  return newState;
}

export default toastReducer;
