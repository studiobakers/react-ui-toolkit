import {ToastContextState} from "./toastTypes";

const DEFAULT_TOAST_TIMEOUT = 4000;

const initialToastState: ToastContextState = {
  toastStack: [],
  autoCloseToasts: true,
  defaultAutoCloseTimeout: DEFAULT_TOAST_TIMEOUT
};

export {initialToastState};
