import { ToastAction } from "../context/toastContextTypes";
import { initialToastState } from "../toastConstants";
declare type ToastState = typeof initialToastState;
declare function toastReducer(state: ToastState, action: ToastAction): ToastState;
export default toastReducer;
