import "./_checkbox-input.scss";
import React from "react";
import { RadioInputItem } from "../../..";
export interface CheckboxInputProps {
    item: RadioInputItem;
    onSelect: (item: RadioInputItem, event?: React.SyntheticEvent<HTMLInputElement>) => void;
    isSelected: boolean;
    isDisabled?: boolean;
    customIcon?: React.ReactNode;
    customClassName?: string;
    testid?: string;
}
declare function CheckboxInput({ item, onSelect, customClassName, isSelected, isDisabled, customIcon, testid }: CheckboxInputProps): JSX.Element;
export default CheckboxInput;
