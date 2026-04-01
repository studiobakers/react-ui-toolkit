import React from "react";
import { ToastStateContext, ToastDispatchContext } from "./util/ToastContext";
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
declare function ToastContextProvider({ children, customRootId, autoCloseToasts, limit, defaultAutoCloseTimeout }: ToastContextProviderProps): import("react/jsx-runtime").JSX.Element;
export { ToastDispatchContext, ToastStateContext, ToastContextProvider };
