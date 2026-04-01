/// <reference types="react" />
import "./_toast-stack.scss";
interface ToastStackProps {
    customRootId?: string;
}
declare function ToastStack({ customRootId }: ToastStackProps): import("react").ReactPortal | null;
export default ToastStack;
