import React, {createContext, useReducer, useEffect} from "react";

import ToastStack from "./stack/ToastStack";
import {DEFAULT_TOAST_TIMEOUT, initialToastState} from "./util/toastConstants";
import toastReducer from "./util/toastReducer";
import {ToastAction, ToastContextState} from "./util/toastTypes";
import {isNonNegativeNumber} from "../core/utils/number/numberUtils";

const ToastStateContext = createContext<ToastContextState>(initialToastState);
const ToastDispatchContext = createContext<React.Dispatch<ToastAction>>(() => undefined);

ToastDispatchContext.displayName = "ToastDispatchContext";
ToastStateContext.displayName = "ToastStateContext";

interface ToastContextProviderProps {
  children: React.ReactNode;
  customRootId?: string;
  autoCloseToasts?: boolean;
  limit?: number;
  defaultAutoCloseTimeout?: number;
}

/**
 * Wraps its children in a context provider
 * these children can then use the useToast hook to show toast messages
 */

function ToastContextProvider({
  children,
  customRootId,
  autoCloseToasts = true,
  limit,
  defaultAutoCloseTimeout = DEFAULT_TOAST_TIMEOUT
}: ToastContextProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, {
    ...initialToastState,
    autoCloseToasts,
    limit,
    defaultAutoCloseTimeout
  });

  useEffect(() => {
    if (isNonNegativeNumber(limit)) {
      dispatch({type: "SET_LIMIT", limit});
    }
  }, [limit]);

  useEffect(() => {
    dispatch({type: "SET_AUTO_CLOSE", autoCloseToasts});
  }, [autoCloseToasts]);

  useEffect(() => {
    dispatch({
      type: "SET_DEFAULT_AUTO_CLOSE_TIMEOUT_FOR_ALL_TOASTS",
      timeout: defaultAutoCloseTimeout
    });
  }, [defaultAutoCloseTimeout]);

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}

        <ToastStack customRootId={customRootId} />
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export {ToastDispatchContext, ToastStateContext, ToastContextProvider};
