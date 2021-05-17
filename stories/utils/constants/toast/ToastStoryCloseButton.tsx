import React from "react";

import Button from "../../../../src/button/Button";
import {useToaster} from "../../../../src/toast/util/toastHooks";
import {useToastStory} from "./ToastStoryContext";

interface ToastStoryCloseButtonProps {
  children: React.ReactNode;
  testid?: string;
}

function ToastStoryCloseButton({children, testid}: ToastStoryCloseButtonProps) {
  const {hide} = useToaster();
  const {toastId} = useToastStory();

  return (
    <Button testid={testid} onClick={handleClick} customClassName={"toast-story__close-button"}>
      {children}
    </Button>
  );

  function handleClick() {
    hide(toastId);
  }
}

export default ToastStoryCloseButton;
