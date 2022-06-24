import {useCallback, useContext} from "react";

import {generateRandomString} from "../../core/utils/string/stringUtils";
import {ToastItemContext} from "../ToastItemContext";
import {ToastDispatchContext, ToastStateContext} from "../ToastProvider";
import {ToastContextState, ToastData} from "./toastTypes";

/**
 * @returns {Object} Current value of ToastContextState
 */
function useToastContextState(): ToastContextState {
  const state = useContext(ToastStateContext);

  if (!state) {
    throw new Error("Trying to consume ToastStateContext outside of its provider.");
  }

  return state;
}

function useToaster() {
  const dispatch = useContext(ToastDispatchContext);

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

function useToastItemContext() {
  const toastItemContext = useContext(ToastItemContext);

  if (!toastItemContext) {
    throw new Error("Trying to consume ToastItemContext outside of its provider");
  }

  return toastItemContext;
}

export {useToastContextState, useToaster, useToastItemContext};
