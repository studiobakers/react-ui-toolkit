import {createContext, useContext} from "react";

type ToastCloseButtonContextValue = {
  toastId: string;
};

const ToastCloseButtonContext = createContext<ToastCloseButtonContextValue>({
  toastId: ""
});

ToastCloseButtonContext.displayName = "ToastCloseButtonContext";

function useToastCloseButton() {
  const toastStoryContext = useContext(ToastCloseButtonContext);

  if (!toastStoryContext) {
    throw new Error("No context found for ToastCloseButtonContext");
  }

  return toastStoryContext;
}

export {ToastCloseButtonContext, useToastCloseButton};
