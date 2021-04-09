import "./_toast.scss";

import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import {useToast} from "./util/toastHooks";

function Toast() {
  const {
    toastState: {
      isDisplayed,
      data: {autoClose, timeout, component, mode, customClassName}
    },
    dispatchToastAction
  } = useToast();

  useEffect(() => {
    let timeoutId: number;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        dispatchToastAction({
          type: "HIDE"
        });
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDisplayed, autoClose, timeout, dispatchToastAction]);

  const toast = (
    <div className={classNames("toast", `toast--${mode}`, customClassName)}>
      {component}
    </div>
  );

  return ReactDOM.createPortal(toast, document.querySelector("#toast-root")!);
}

export default Toast;
