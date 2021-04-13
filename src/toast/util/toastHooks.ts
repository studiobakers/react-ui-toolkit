import {useContext} from "react";

import {ToastContext} from "../ToastProvider";
import {ToastData} from "./toastTypes";

function useToast() {
  return useContext(ToastContext);
}

function useToaster() {
  return useToast().dispatchToastAction;
}

function useDisplayToast() {
  const dispatchToast = useToaster();

  function displayToast(payload: ToastData) {
    dispatchToast({
      type: "DISPLAY",
      payload
    });
  }

  return displayToast;
}

export {useToast, useToaster, useDisplayToast};
