import "./_password-input.scss";
import React from "react";
import { InputProps } from "../input/util/inputTypes";
export interface PasswordInputProps extends Omit<InputProps, "leftIcon" | "rightIcon"> {
    hideIcon?: React.ReactNode;
    revealIcon?: React.ReactNode;
}
declare function PasswordInput({ testid, name, value, onChange, hasError, placeholder, customClassName, hideIcon, revealIcon }: PasswordInputProps): JSX.Element;
export default PasswordInput;
