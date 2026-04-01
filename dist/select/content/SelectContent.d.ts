import "./_select-content.scss";
import { type ReactNode } from "react";
export interface SelectContentProps {
    children: ReactNode;
    customClassName?: string;
}
declare const SelectContent: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
export default SelectContent;
