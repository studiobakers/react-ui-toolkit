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
 * @returns {function} A function which expects a customToastId string as an argument and hide a Toast when executed. This function directly passes the provided argument as the payload to ToastContext's dispatch function with type "HIDE"
 */
function useDisplayToast() {
  const dispatchToast = useToaster();

  function display(payload: ToastItem) {
    if (!payload.customToastId) {
      // eslint-disable-next-line no-magic-numbers
      payload.customToastId = Math.random().toString(36).substring(7);
    }

    dispatchToast({
      type: "DISPLAY",
      payload
    });
  }

  function hide(customToastId: ToastItem["customToastId"]) {
    dispatchToast({
      type: "HIDE",
      payload: {customToastId}
    });
  }

  return {display, hide};
}

export {useToast, useToaster, useDisplayToast};
