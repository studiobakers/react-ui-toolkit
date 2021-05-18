import {createContext, useContext} from "react";

type ToastItemContextValue = {
  toastId: string;
};

const ToastItemContext = createContext<ToastItemContextValue>({
  toastId: ""
});

ToastItemContext.displayName = "ToastItemContext";

function useToastCloseButton() {
  const toastStoryContext = useContext(ToastItemContext);

  if (!toastStoryContext) {
    throw new Error("Trying to consume ToastItemContext outside of its provider");
  }

  return toastStoryContext;
}

export {ToastItemContext, useToastCloseButton};
