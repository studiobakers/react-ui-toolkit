import React from "react";

import ToastStoryCloseButton from "./ToastStoryCloseButton";
import {ToastStoryContext} from "./ToastStoryContext";

interface ToastStoryProps {
  toastId: string;
  mode?: "info" | "success" | "warning" | "error";
  content: string;
  children?: React.ReactNode;
}

function ToastStory({toastId, mode, content, children}: ToastStoryProps) {
  return (
    <ToastStoryContext.Provider value={{toastId}}>
      <div className={`toast-story toast-story--${mode}`}>{content}</div>

      {children}
    </ToastStoryContext.Provider>
  );
}

ToastStory.CloseButton = ToastStoryCloseButton;

export default ToastStory;
