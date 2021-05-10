import {ToastItem} from "./toastTypes";

const initialToastStackState = {
  toastItems: [] as ToastItem[]
};

const initialToastState = {
  content: "",
  timeout: 4000,
  autoClose: true
};

export {initialToastStackState, initialToastState};
