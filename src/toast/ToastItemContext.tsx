import {createContext} from "react";

type ToastItemContextValue = {
  toastId: string;
};

const ToastItemContext = createContext<ToastItemContextValue>({
  toastId: ""
});

ToastItemContext.displayName = "ToastItemContext";

export {ToastItemContext};
