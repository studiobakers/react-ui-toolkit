import "./_input.scss";

import React from "react";
import classNames from "classnames";

type InputType = "text" | "email" | "password" | "number" | "hidden" | "url";

interface InputProps {
  name: string;
  onChange: React.ReactEventHandler<HTMLInputElement>;
  type?: InputType;
  value?: string;
  onFocus?: React.ReactEventHandler<HTMLInputElement>;
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  role?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  inputContainerRef?: React.RefObject<HTMLDivElement>;
}

function Input(props: InputProps) {
  const {
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    step,
    min,
    max,
    isDisabled,
    onFocus,
    className,
    onBlur,
    onKeyUp,
    onKeyDown,
    leftIcon,
    rightIcon,
    role,
    inputContainerRef,
    ...rest
  } = props;
  const inputContainerClassName = classNames("input-container", className);
  const inputClassName = classNames("input", {
    disabled: isDisabled
  });

  return (
    <div ref={inputContainerRef} role={role} className={inputContainerClassName}>
      {leftIcon && <span className={"input-container-left-icon"}>{leftIcon}</span>}

      <input
        className={inputClassName}
        name={name}
        type={type}
        step={step}
        max={max}
        min={min}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={"off"}
        autoCorrect={"off"}
        disabled={isDisabled}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        {...rest}
      />

      {rightIcon && <span className={"input-container-right-icon"}>{rightIcon}</span>}
    </div>
  );
}

export default Input;
