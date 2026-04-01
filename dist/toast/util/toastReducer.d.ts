import { initialToastState } from "./toastConstants";
import { ToastAction } from "./toastTypes";
type ToastState = typeof initialToastState;
declare function toastReducer(state: ToastState, action: ToastAction): ToastState;
export default toastReducer;
