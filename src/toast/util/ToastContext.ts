import {createContext} from "react";

import {ToastAction, ToastContextState} from "./toastTypes";

const ToastStateContext = createContext<null | ToastContextState>(null);
const ToastDispatchContext = createContext<null | React.Dispatch<ToastAction>>(null);

ToastDispatchContext.displayName = "ToastDispatchContext";
ToastStateContext.displayName = "ToastStateContext";

export {ToastStateContext, ToastDispatchContext};
