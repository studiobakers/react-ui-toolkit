import "./_toast.scss";

import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import {useToast} from "./util/toastHooks";

function Toast() {
  const {
    toastState: {
      isDisplayed,
      data: {autoClose, timeout, content, mode, customClassName}
    },
    dispatchToastAction
  } = useToast();
  let toastRootNode = document.querySelector("#toast-root");

  if (!toastRootNode) {
    toastRootNode = document.createElement("div");
    toastRootNode.setAttribute("id", "toast-root");
  }

  document.body.appendChild(toastRootNode);

  useEffect(() => {
    let timeoutId: number;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        dispatchToastAction({
          type: "HIDE"
        });

        if (toastRootNode) {
          document.body.removeChild(toastRootNode);
        }
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDisplayed, autoClose, timeout, dispatchToastAction]);

  const toast = (
    <div className={classNames("toast", `toast--${mode}`, customClassName)}>
      {content}
    </div>
  );

  return ReactDOM.createPortal(toast, toastRootNode);
}

export default Toast;
