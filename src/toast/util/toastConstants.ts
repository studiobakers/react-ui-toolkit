import {ToastItem} from "./toastTypes";

const initialToastState = {
  isDisplayed: false,
  data: {
    content: "",
    timeout: 4000,
    autoClose: true
  } as ToastItem
};

export {initialToastState};
