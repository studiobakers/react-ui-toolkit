import {ToastData} from "./context/toastContextTypes";

function isSameToast(toastId: string) {
  return (toast2: ToastData) => toastId === toast2.id;
}

export {isSameToast};
