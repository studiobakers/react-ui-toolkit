import "./_toast-stack.scss";
import React from "react";
interface ToastStackProps {
    customRootId?: string;
}
declare function ToastStack({ customRootId }: ToastStackProps): React.ReactPortal | null;
export default ToastStack;
