import React, {useLayoutEffect} from "react";

import {useToaster} from "./util/toastHooks";
import {ToastContextState} from "./util/toastTypes";
import ListItem from "../list/item/ListItem";
import {DEFAULT_TOAST_TIMEOUT} from "./util/toastConstants";

export interface ToastProps {
  testid: string;
  data: ToastContextState["toastStack"][0];
}

function Toast({testid, data}: ToastProps) {
  const {hide} = useToaster();
  const {
    autoClose = true,
    timeout = DEFAULT_TOAST_TIMEOUT,
    render,
    customClassName,
    id: toastId
  } = data;

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose) {
      timeoutId = setTimeout(() => {
        hide(toastId);
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoClose, timeout, hide, toastId]);

  return (
    <ListItem testid={testid} customClassName={customClassName}>
      {render()}
    </ListItem>
  );
}

export default Toast;
