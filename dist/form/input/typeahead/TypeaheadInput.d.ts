import React from "react";
import { InputProps, InputTypes } from "../util/inputTypes";
export type TypeaheadInputProps = Omit<InputProps, "onChange" | "type"> & {
    onQueryChange: (value: string) => void;
    type?: Extract<InputTypes, "text" | "number">;
    initialValue?: string;
    queryChangeDebounceTimeout?: number;
    onFocus?: React.ReactEventHandler<HTMLInputElement>;
    onBlur?: React.ReactEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    role?: string;
    children?: React.ReactNode;
};
declare const TypeaheadInput: React.ForwardRefExoticComponent<Omit<InputProps, "type" | "onChange"> & {
    onQueryChange: (value: string) => void;
    type?: "number" | "text" | undefined;
    initialValue?: string | undefined;
    queryChangeDebounceTimeout?: number | undefined;
    onFocus?: React.ReactEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.ReactEventHandler<HTMLInputElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    role?: string | undefined;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>>;
export default TypeaheadInput;
