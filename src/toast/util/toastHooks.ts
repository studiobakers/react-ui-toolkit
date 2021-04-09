import {useContext} from "react";

import {ToastContext} from "../ToastProvider";

function useToast() {
  return useContext(ToastContext);
}

function useToaster() {
  return useToast().dispatchToastAction;
}

export {useToast, useToaster};
