import {useContext} from "react";

import {ToastContext} from "../ToastProvider";
import {ToastItem} from "./toastTypes";

/**
 * @returns {Object} Current value of ToastContext
 */
function useToast() {
  return useContext(ToastContext);
}

/**
 * @returns {function} ToastContext's state reducer's dispatch function
 */
function useToaster() {
  return useToast().dispatchToastAction;
}

/**
 * @returns {function} A function which expects a ToastItem object as an argument and displays a Toast when executed. This function directly passes the provided argument as the payload to ToastContext's dispatch function with type "DISPLAY"
 */
function useDisplayToast() {
  const dispatchToast = useToaster();

  function displayToast(payload: ToastItem) {
    dispatchToast({
      type: "DISPLAY",
      payload
    });
  }

  function hideToast(customToastId: ToastItem["customToastId"]) {
    dispatchToast({
      type: "HIDE",
      payload: {customToastId}
    });
  }

  return {displayToast, hideToast};
}

export {useToast, useToaster, useDisplayToast};
