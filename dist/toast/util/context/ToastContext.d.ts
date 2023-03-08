/// <reference types="react" />
import { ToastContextState, ToastAction, ToastData } from "./toastContextTypes";
declare const ToastStateContext: import("react").Context<ToastContextState | null>;
declare const ToastDispatchContext: import("react").Context<import("react").Dispatch<ToastAction> | null>;
/**
 * @returns {Object} Current value of ToastContextState
 */
declare function useToastContextState(): ToastContextState;
declare function useToaster(): {
    /**
     * Display a Toast
     * @returns {string} Toast's id
     */
    display: (toastData: ToastData) => string;
    /**
     * Hide a Toast with a given id
     */
    hide: (toastId: string) => void;
    /**
     * Updates the data for a Toast given its ID
     */
    update: (toastId: string, toastData: Partial<ToastData>) => void;
    /**
     * Hide all visible Toasts
     */
    hideAll: () => void;
};
export { ToastStateContext, ToastDispatchContext, useToastContextState, useToaster };
