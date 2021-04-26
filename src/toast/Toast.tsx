import "./_toast.scss";

import React, {useLayoutEffect} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import {useToast} from "./util/toastHooks";

function Toast() {
  const {
    toastState: {
      isDisplayed,
      data: {autoClose, timeout, content, mode, customClassName, customRootId}
    },
    dispatchToastAction
  } = useToast();
  const toastRootNode = document.createElement("div");

  toastRootNode.setAttribute("id", customRootId || "toast-root");
  document.body.appendChild(toastRootNode);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        dispatchToastAction({
          type: "HIDE"
        });
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);

      if (toastRootNode) {
        document.body.removeChild(toastRootNode);
      }
    };
  }, [isDisplayed, autoClose, timeout, toastRootNode, dispatchToastAction]);

  const toast = (
    <div className={classNames("toast", `toast--${mode}`, customClassName)}>
      {content}
    </div>
  );

  return ReactDOM.createPortal(toast, toastRootNode);
}

export default Toast;
