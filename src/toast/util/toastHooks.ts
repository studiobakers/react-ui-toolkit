import {useCallback, useContext} from "react";

import {generateRandomString} from "../../core/utils/string/stringUtils";
import {ToastItemContext} from "../ToastItemContext";
import {ToastContext} from "../ToastProvider";
import {ToastData} from "./toastTypes";

/**
 * @returns {Object} Current value of ToastContext
 */
function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("Trying to consume ToastContext outside of its provider.");
  }

  return context;
}

/**
 * @returns {function} ToastContext's state reducer's dispatch function
 */
function useToaster() {
  const [{limit}, dispatch] = useToastContext();

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
          },
          limit
        });

        return toastId;
      },
      [dispatch, limit]
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

function useToastItemContext() {
  const toastStoryContext = useContext(ToastItemContext);

  if (!toastStoryContext) {
    throw new Error("Trying to consume ToastItemContext outside of its provider");
  }

  return toastStoryContext;
}

export {useToastContext, useToaster, useToastItemContext};
