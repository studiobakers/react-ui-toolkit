import React, {createContext, useReducer} from "react";

import ToastStack from "./stack/ToastStack";
import {initialToastStackState} from "./util/toastConstants";
import toastReducer from "./util/toastReducer";
import {ToastAction} from "./util/toastTypes";

const ToastContext = createContext({
  toastState: initialToastStackState,
  dispatchToastAction: (() => null) as React.Dispatch<ToastAction>
});

interface ToastContextProviderProps {
  children: React.ReactNode;
}

/**
 * <ToastContextProvider> Wraps its children in a context provider
 * these children can then use the useToast hook to show toast messages
 */

function ToastContextProvider({children}: ToastContextProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, initialToastStackState);

  return (
    <ToastContext.Provider value={{toastState: state, dispatchToastAction: dispatch}}>
      {children}

      {state.toastItems.length && <ToastStack />}
    </ToastContext.Provider>
  );
}

export {ToastContext, ToastContextProvider};
