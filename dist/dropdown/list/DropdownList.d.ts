import "./_dropdown-list.scss";
import React from "react";
import { DropdownOption, DropdownOptionSelectHandler, DropdownSelectedOption } from "./item/DropdownListItem";
export interface DropdownListProps<OptionIdShape extends string> {
    isVisible: boolean;
    options: DropdownOption<OptionIdShape>[];
    selectedOption: DropdownSelectedOption<OptionIdShape>;
    focusedOption: DropdownSelectedOption<OptionIdShape>;
    onSelect: DropdownOptionSelectHandler<OptionIdShape>;
    onFocus: DropdownOptionSelectHandler<OptionIdShape>;
    testid?: string;
    onMouseDown?: React.ReactEventHandler<HTMLLIElement>;
    onMouseUp?: React.ReactEventHandler<HTMLLIElement>;
    onKeyDown?: DropdownOptionSelectHandler<OptionIdShape>;
    role?: "listbox" | "menu" | "combobox";
    customClassName?: string;
    ariaLabelledBy?: string;
    ariaHidden?: boolean;
    isMultiSelect?: boolean;
    children?: never;
    canSelectAlreadySelected?: boolean;
    noOptionsMessage?: string;
}
declare function DropdownList<OptionIdShape extends string>({ testid, isVisible, options, customClassName, role, ariaLabelledBy, ariaHidden, isMultiSelect, selectedOption, focusedOption, onSelect, onFocus, onKeyDown, onMouseDown, onMouseUp, canSelectAlreadySelected, noOptionsMessage }: DropdownListProps<OptionIdShape>): JSX.Element;
export default DropdownList;
