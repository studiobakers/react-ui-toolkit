import React, {createContext, useReducer} from "react";

import ToastStack from "./stack/ToastStack";
import {initialToastState} from "./util/toastConstants";
import toastReducer from "./util/toastReducer";
import {ToastAction, ToastContextState} from "./util/toastTypes";

const ToastContext = createContext<[ToastContextState, React.Dispatch<ToastAction>]>([
  initialToastState,
  () => undefined
]);

ToastContext.displayName = "ToastContext";

interface ToastContextProviderProps {
  children: React.ReactNode;
  customRootId?: string;
}

/**
 * Wraps its children in a context provider
 * these children can then use the useToast hook to show toast messages
 */

function ToastContextProvider({children, customRootId}: ToastContextProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);

  return (
    <ToastContext.Provider value={[state, dispatch]}>
      {children}

      <ToastStack customRootId={customRootId} />
    </ToastContext.Provider>
  );
}

export {ToastContext, ToastContextProvider};
