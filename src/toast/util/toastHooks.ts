import {useContext} from "react";

import {ToastContext} from "../ToastProvider";
import {ToastItem} from "./toastTypes";

/**
 * @return {function} Return ToastContext that includes toastState & dispatchToastAction.
 */
function useToast() {
  return useContext(ToastContext);
}

/**
 * @return {function} Return a function that display toast message.
 */
function useToaster() {
  return useToast().dispatchToastAction;
}

/**
 * Displays Toast message with a content according to mode.
 * @param {string} mode A toast type for "danger" | "warning" | "success".
 * @param {ReactNode} content A node for displaying on the body.
 * @return {function} Return a function that display toast message and take a payload.
 */
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
