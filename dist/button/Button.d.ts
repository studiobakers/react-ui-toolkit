import React from "react";
import "./_button.scss";
export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "className"> & {
    children: React.ReactNode;
    testid?: string;
    customSpinner?: React.ReactNode;
    isDisabled?: boolean;
    shouldPreventDefault?: boolean;
    shouldStopPropagation?: boolean;
    shouldFocus?: boolean;
    shouldDisplaySpinner?: boolean;
    customClassName?: string;
};
declare const Button: React.ForwardRefExoticComponent<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "className"> & {
    children: React.ReactNode;
    testid?: string | undefined;
    customSpinner?: React.ReactNode;
    isDisabled?: boolean | undefined;
    shouldPreventDefault?: boolean | undefined;
    shouldStopPropagation?: boolean | undefined;
    shouldFocus?: boolean | undefined;
    shouldDisplaySpinner?: boolean | undefined;
    customClassName?: string | undefined;
} & React.RefAttributes<HTMLButtonElement>>;
export default Button;
