import {useContext} from "react";

import {ToastContext} from "../ToastProvider";
import {ToastItem} from "./toastTypes";

function useToast() {
  return useContext(ToastContext);
}

function useToaster() {
  return useToast().dispatchToastAction;
}

function useDisplayToast() {
  const dispatchToast = useToaster();

  function displayToast(payload: ToastItem) {
    dispatchToast({
      type: "DISPLAY",
      payload
    });
  }

  return displayToast;
}

export {useToast, useToaster, useDisplayToast};
