import {createContext, useContext} from "react";

type ToastStoryContextValue = {
  toastId: string;
};

const ToastStoryContext = createContext<ToastStoryContextValue>({
  toastId: ""
});

ToastStoryContext.displayName = "ToastStoryContext";

function useToastStory() {
  const toastStoryContext = useContext(ToastStoryContext);

  if (!toastStoryContext) {
    throw new Error("No context found for ToastStoryContext");
  }

  return toastStoryContext;
}

export {ToastStoryContext, useToastStory};
