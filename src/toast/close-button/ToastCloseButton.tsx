import "./_toast-close-button.scss";

import React from "react";

import Button from "../../button/Button";
import {useToaster} from "../util/context/ToastContext";
import {useToastItemContext} from "../ToastItemContext";

interface ToastCloseButtonProps {
  children: React.ReactNode;
  testid?: string;
}

function ToastCloseButton({children, testid}: ToastCloseButtonProps) {
  const {hide} = useToaster();
  const {toastId} = useToastItemContext();

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
