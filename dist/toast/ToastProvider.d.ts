import React from "react";
import { ToastAction, ToastContextState } from "./util/toastTypes";
declare const ToastStateContext: React.Context<ToastContextState | null>;
declare const ToastDispatchContext: React.Context<React.Dispatch<ToastAction> | null>;
interface ToastContextProviderProps {
    children: React.ReactNode;
    customRootId?: string;
    autoCloseToasts?: boolean;
    limit?: number;
    defaultAutoCloseTimeout?: number;
}
/**
 * Wraps its children in a context provider
 * these children can then use the useToast hook to show toast messages
 */
declare function ToastContextProvider({ children, customRootId, autoCloseToasts, limit, defaultAutoCloseTimeout }: ToastContextProviderProps): JSX.Element;
export { ToastDispatchContext, ToastStateContext, ToastContextProvider };
