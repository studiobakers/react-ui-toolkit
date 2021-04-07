import "./_input.scss";

import React from "react";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "disabled" | "name" | "className"
> & {
  name: string;
  type?:
    | "checkbox"
    | "button"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
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
    type = "text",
    isDisabled,
    hasError,
    customClassName,
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
        type={type}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={isDisabled}
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
