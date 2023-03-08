import "./_toast-close-button.scss";
import React from "react";
interface ToastCloseButtonProps {
    children: React.ReactNode;
    testid?: string;
}
declare function ToastCloseButton({ children, testid }: ToastCloseButtonProps): JSX.Element;
export default ToastCloseButton;
