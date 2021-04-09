import {ToastData} from "./toastTypes";

const initialToastState = {
  isDisplayed: false,
  data: {
    component: "",
    timeout: 4000,
    autoClose: true
  } as ToastData
};

export {initialToastState};
