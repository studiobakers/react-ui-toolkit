import "./_dropdown-list-item.scss";
import React from "react";
export interface DropdownOption<Id = string, Context = any> {
    id: Id;
    title: string;
    customClassName?: string;
    CustomContent?: JSX.Element;
    icon?: React.ReactNode;
    subtitle?: string;
    context?: Context;
    isDisabled?: boolean;
}
export declare type DropdownOptionSelectHandler<Id = string, Context = any> = (option: DropdownOption<Id, Context> | null, event?: React.SyntheticEvent<HTMLLIElement>) => void;
export declare type DropdownSelectedOption<Id = string, Context = any> = DropdownOption<Id, Context> | null | undefined;
export interface DropdownListItemProps<OptionIdShape = string> {
    testid?: string;
    option: DropdownOption<OptionIdShape>;
    selectedOption: DropdownSelectedOption<OptionIdShape>;
    focusedOption?: DropdownSelectedOption<OptionIdShape>;
    onSelect: DropdownOptionSelectHandler<OptionIdShape>;
    onFocus: DropdownOptionSelectHandler<OptionIdShape>;
    onKeyDown?: DropdownOptionSelectHandler<OptionIdShape>;
    onMouseDown?: React.ReactEventHandler<HTMLLIElement>;
    onMouseUp?: React.ReactEventHandler<HTMLLIElement>;
    canSelectAlreadySelected?: boolean;
    focusedItemRef?: React.RefObject<HTMLLIElement>;
}
declare function DropdownListItem<OptionIdShape extends string>({ testid, option, selectedOption, onSelect, focusedOption, onFocus, onKeyDown, onMouseDown, onMouseUp, canSelectAlreadySelected, focusedItemRef }: DropdownListItemProps<OptionIdShape>): JSX.Element;
export default DropdownListItem;
