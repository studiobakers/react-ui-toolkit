import {useCallback, useContext} from "react";

import {generateRandomString} from "../../core/utils/string/stringUtils";
import {ToastContext} from "../ToastProvider";
import {ToastData} from "./toastTypes";

/**
 * @returns {Object} Current value of ToastContext
 */
function useToastContext() {
  return useContext(ToastContext);
}

/**
 * @returns {function} ToastContext's state reducer's dispatch function
 */
function useToaster() {
  const dispatch = useToastContext()[1];

  return {
    /**
     * Display a Toast
     * @returns {string} Toast's id
     */
    display: useCallback(
      (toastData: ToastData) => {
        const toastId = toastData.id || generateRandomString();

        dispatch({
          type: "DISPLAY",
          toastData: {
            ...toastData,
            id: toastId
          }
        });

        return toastId;
      },
      [dispatch]
    ),
    /**
     * Hide a Toast with a given id
     */
    hide: useCallback(
      (toastId: string) => {
        dispatch({
          type: "HIDE",
          toastId
        });
      },
      [dispatch]
    ),
    /**
     * Updates the data for a Toast given its ID
     */
    update: useCallback(
      (toastId, toastData: Partial<ToastData>) => {
        dispatch({
          type: "UPDATE",
          toastId,
          toastData
        });
      },
      [dispatch]
    ),
    /**
     * Hide all visible Toasts
     */
    hideAll: useCallback(() => {
      dispatch({
        type: "HIDE_ALL"
      });
    }, [dispatch])
  };
}

export {useToastContext, useToaster};
