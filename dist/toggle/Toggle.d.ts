import "./_toggle.scss";
import React from "react";
import ToggleItem from "./item/ToggleItem";
import { ToggleContext } from "./util/ToggleContext";
export interface ToggleProps {
    children: React.ReactNode;
    onToggle: (selectedItems: string[]) => void;
    selectedItems: string[];
    canSelectMultiple?: boolean;
    position?: "vertical" | "horizontal";
    isDisabled?: boolean;
    customClassName?: string;
}
declare function Toggle({ children, onToggle, selectedItems, canSelectMultiple, position, isDisabled, customClassName }: ToggleProps): JSX.Element;
declare namespace Toggle {
    var Item: typeof ToggleItem;
}
export { Toggle, ToggleContext };
