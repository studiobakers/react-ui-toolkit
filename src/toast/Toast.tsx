import "./_toast.scss";

import React, {useLayoutEffect} from "react";
import classNames from "classnames";

import {useToast} from "./util/toastHooks";
import {ToastItem} from "./util/toastTypes";

export interface ToastProps {
  toastItem: ToastItem;
}

function Toast({toastItem}: ToastProps) {
  const {dispatchToastAction} = useToast();
  const {mode, content, autoClose, timeout, customClassName, customToastId} = toastItem;

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        dispatchToastAction({
          type: "HIDE",
          payload: {customToastId}
        });
      }, timeout!);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [customToastId, autoClose, timeout, dispatchToastAction]);

  return (
    <div className={classNames("toast", `toast--${mode}`, customClassName)}>
      {content}
    </div>
  );
}

export default Toast;
