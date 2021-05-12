import "./_input.scss";

import React from "react";
import classNames from "classnames";

import {
  NOT_INTEGER_FIRST_CHARACTER_OF_STRING_REGEX,
  NOT_NUMBER_NOR_DECIMAL_POINT_REGEX,
  PRECISION_REGEX,
  DECIMAL_NUMBER_SEPARATOR,
  THOUSANDTHS_SEPARATOR,
  IS_LAST_CHARACTER_DECIMAL_POINT_REGEX
} from "../../core/utils/number/numberConstants";

type InputTypes =
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

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "disabled" | "name" | "className"
> & {
  name: string;
  type?: InputTypes;
  testid?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  hasError?: boolean;
  customClassName?: string;
  inputContainerRef?: React.RefObject<HTMLDivElement>;
  onChange: React.ReactEventHandler<HTMLInputElement>;
  maxFractionDigits?: number;
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
    onChange,
    maxFractionDigits = 0,
    ...rest
  } = props;
  const inputContainerClassName = classNames("input-container", customClassName);
  const inputClassName = classNames("input", {
    "input--is-disabled": isDisabled,
    "input--has-error": hasError
  });
  const isNumberInput = type === "number";

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
        type={isNumberInput ? "text" : type}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={isDisabled}
        onChange={handleChange}
        {...rest}
      />

      {rightIcon && (
        <span className={"input-container__icon input-container__right-icon"}>
          {rightIcon}
        </span>
      )}
    </div>
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (isNumberInput) {
      const {value: newValue} = event.currentTarget;

      let formattedNewValue = newValue
        .replace(NOT_INTEGER_FIRST_CHARACTER_OF_STRING_REGEX, "")
        .replace(NOT_NUMBER_NOR_DECIMAL_POINT_REGEX, "")
        .replace(PRECISION_REGEX, "$1");

      if (maxFractionDigits > 0) {
        const decimalNumberParts = newValue.split(DECIMAL_NUMBER_SEPARATOR);
        const decimalPart = decimalNumberParts[1];
        const integerPart = decimalNumberParts[0].replace(THOUSANDTHS_SEPARATOR, "");

        if (decimalPart && decimalPart.length > maxFractionDigits) {
          const trimmedDecimalPart = decimalPart.slice(0, maxFractionDigits);

          formattedNewValue = `${integerPart}${DECIMAL_NUMBER_SEPARATOR}${trimmedDecimalPart}`;
        }
      } else {
        formattedNewValue = formattedNewValue.replace(
          IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
          ""
        );
      }

      if (formattedNewValue !== newValue) {
        event.currentTarget.value = formattedNewValue;
      }
    }

    onChange(event);
  }
}

export default Input;
