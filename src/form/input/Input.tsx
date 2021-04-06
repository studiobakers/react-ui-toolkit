import "./_input.scss";

import React from "react";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "disabled" | "name"
> & {
  name: string;
  type?: "text" | "color";
  testid?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  hasError?: boolean;
  customClassName?: string;
  inputContainerRef?: React.RefObject<HTMLDivElement>;
};

function Input(props: InputProps) {
  const {
    testid,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    step,
    min,
    max,
    isDisabled,
    hasError,
    onFocus,
    customClassName,
    onBlur,
    onKeyUp,
    onKeyDown,
    onInput,
    leftIcon,
    rightIcon,
    role,
    autoComplete = "off",
    autoCorrect = "off",
    inputContainerRef,
    ...rest
  } = props;
  const inputContainerClassName = classNames("input-container", customClassName);
  const inputClassName = classNames("input", {
    "input--is-disabled": isDisabled,
    "input--has-error": hasError
  });

  return (
    <div
      ref={inputContainerRef}
      role={role}
      className={inputContainerClassName}
      data-testid={testid}>
      {leftIcon && (
        <span className={"input-container__icon input-container__left-icon"}>
          {leftIcon}
        </span>
      )}

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
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={isDisabled}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onInput={onInput}
        {...rest}
      />

      {rightIcon && (
        <span className={"input-container__icon input-container__right-icon"}>
          {rightIcon}
        </span>
      )}
    </div>
  );
}

export default Input;
