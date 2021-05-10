import "./_toast.scss";

import React, {useLayoutEffect} from "react";
import classNames from "classnames";

import {useDisplayToast} from "./util/toastHooks";
import {ToastItem} from "./util/toastTypes";
import Button from "../button/Button";

export interface ToastProps {
  toastItem: ToastItem;
}

function Toast({toastItem}: ToastProps) {
  const {hide} = useDisplayToast();
  const {mode, content, autoClose, timeout, customClassName, customToastId} = toastItem;

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        hide(customToastId);
      }, timeout!);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [customToastId, autoClose, timeout, hide]);

  return (
    <div className={classNames("toast", `toast--${mode}`, customClassName)}>
      {content}

      <Button onClick={handleCloseButton} customClassName={"toast__close-button"}>
        {"X"}
      </Button>
    </div>
  );

  function handleCloseButton() {
    hide(customToastId);
  }
}

export default Toast;
