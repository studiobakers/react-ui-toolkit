import {createContext, useContext} from "react";

type ToastItemContextValue = {
  toastId: string;
};

const ToastItemContext = createContext<ToastItemContextValue>({
  toastId: ""
});

ToastItemContext.displayName = "ToastItemContext";

function useToastItemContext() {
  const toastItemContext = useContext(ToastItemContext);

  if (!toastItemContext) {
    throw new Error("Trying to consume ToastItemContext outside of its provider");
  }

  return toastItemContext;
}

export {ToastItemContext, useToastItemContext};
