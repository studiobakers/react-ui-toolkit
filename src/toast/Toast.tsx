import React, {useLayoutEffect} from "react";
import classNames from "classnames";

import {useToaster, useToastContext} from "./util/toastHooks";
import {ToastContextState} from "./util/toastTypes";
import ListItem from "../list/item/ListItem";
import {DEFAULT_TOAST_TIMEOUT} from "./util/toastConstants";
import ToastCloseButton from "./close-button/ToastCloseButton";
import {ToastItemContext} from "./ToastItemContext";

export interface ToastProps {
  testid: string;
  data: ToastContextState["toastStack"][0];
}

function Toast({testid, data}: ToastProps) {
  const [contextState] = useToastContext();
  const {hide} = useToaster();
  const {timeout = DEFAULT_TOAST_TIMEOUT, render, customClassName, id: toastId} = data;
  const autoClose =
    typeof data.autoClose === "boolean" ? data.autoClose : contextState.autoCloseToasts;

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        hide(toastId);
      }, timeout);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoClose, timeout, hide, toastId]);

  return (
    <ToastItemContext.Provider value={{toastId}}>
      <ListItem testid={testid} customClassName={classNames("toast", customClassName)}>
        {render()}
      </ListItem>
    </ToastItemContext.Provider>
  );
}

Toast.CloseButton = ToastCloseButton;

export default Toast;
