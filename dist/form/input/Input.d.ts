import "./_input.scss";
import React from "react";
declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "name" | "className"> & {
    name: string;
    onChange: React.ReactEventHandler<HTMLInputElement>;
    type?: import("./util/inputTypes").InputTypes | undefined;
    testid?: string | undefined;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isDisabled?: boolean | undefined;
    hasError?: boolean | undefined;
    customClassName?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export default Input;
