import {ToastData} from "./toastTypes";

function isDifferentToast(toastId: string) {
  return (toast2: ToastData) => toastId !== toast2.id;
}

function isSameToast(toastId: string) {
  return (toast2: ToastData) => toastId === toast2.id;
}

export {isDifferentToast, isSameToast};
