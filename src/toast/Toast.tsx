import "./_toast.scss";

import React, {useLayoutEffect} from "react";
import classNames from "classnames";

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
    mode,
    content,
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
    <ListItem
      testid={testid}
      customClassName={classNames("toast", `toast--${mode}`, customClassName)}>
      {content}
    </ListItem>
  );
}

export default Toast;
