/// <reference types="react" />
import { ToastContextState } from "./util/toastTypes";
import ToastCloseButton from "./close-button/ToastCloseButton";
export interface ToastProps {
    testid: string;
    data: ToastContextState["toastStack"][0];
}
declare function Toast({ testid, data }: ToastProps): JSX.Element;
declare namespace Toast {
    var CloseButton: typeof ToastCloseButton;
}
export default Toast;
