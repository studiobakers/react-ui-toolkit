/// <reference types="react" />
import { ToastAction, ToastContextState } from "./toastTypes";
declare const ToastStateContext: import("react").Context<ToastContextState | null>;
declare const ToastDispatchContext: import("react").Context<import("react").Dispatch<ToastAction> | null>;
export { ToastStateContext, ToastDispatchContext };
