import "./_toggle-item.scss";
import React from "react";
export interface ToggleItemProps {
    children: React.ReactNode;
    dataId: string;
    customClassName?: string;
    isDisabled?: boolean;
    testid?: string;
}
declare function ToggleItem({ children, dataId, customClassName, isDisabled, testid }: ToggleItemProps): JSX.Element;
export default ToggleItem;
