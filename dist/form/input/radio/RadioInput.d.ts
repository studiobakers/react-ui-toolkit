import "./_radio-input.scss";
import React from "react";
export interface RadioInputItem<Id = string, Context = any> {
    id: Id;
    content: React.ReactNode;
    inputProps: {
        htmlFor: string;
        value: string;
        name: string;
    };
    isDisabled?: boolean;
    context?: Context;
    customClassName?: string;
}
export type RadioInputSelectHandler<Id = string, Context = any> = (item: RadioInputItem<Id, Context>, event?: React.SyntheticEvent<HTMLInputElement>) => void;
export interface RadioInputProps<Id, Context> {
    item: RadioInputItem<Id, Context>;
    onSelect: RadioInputSelectHandler<Id, Context>;
    isSelected: boolean;
    testid?: string;
    isDisabled?: boolean;
}
declare function RadioInput<Id = string, Context = any>({ testid, item, onSelect, isSelected, isDisabled }: RadioInputProps<Id, Context>): JSX.Element;
export default RadioInput;
