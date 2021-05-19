import "./_toast-close-button.scss";

import React from "react";

import Button from "../../button/Button";
import {useToastCloseButton, useToaster} from "../util/toastHooks";

interface ToastCloseButtonProps {
  children: React.ReactNode;
  testid?: string;
}

function ToastCloseButton({children, testid}: ToastCloseButtonProps) {
  const {hide} = useToaster();
  const {toastId} = useToastCloseButton();

  return (
    <Button testid={testid} onClick={handleClick} customClassName={"toast-close-button"}>
      {children}
    </Button>
  );

  function handleClick() {
    hide(toastId);
  }
}

export default ToastCloseButton;
