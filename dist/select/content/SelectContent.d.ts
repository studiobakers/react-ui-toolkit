import "./_select-content.scss";
import React from "react";
export interface SelectContentProps {
    children: React.ReactNode;
    customClassName?: string;
}
declare const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
export default SelectContent;
