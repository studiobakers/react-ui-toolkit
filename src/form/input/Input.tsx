import "./_input.scss";

import React from "react";
import classNames from "classnames";

import {
  formatNumber,
  getNumberSeparators,
  parseNumber,
  generateNumberRegExps
} from "../../core/utils/number/numberUtils";

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
  localizationOptions?: {
    shouldFormatToLocaleString?: boolean;
    locale?: string;
    maximumFractionDigits?: number;
  };
};

/* eslint-disable complexity */
function Input(props: InputProps) {
  const {
    testid,
    value,
    type = "text",
    isDisabled,
    hasError,
    customClassName,
    leftIcon,
    rightIcon,
    localizationOptions = {},
    role,
    autoComplete = "off",
    autoCorrect = "off",
    inputContainerRef,
    onChange,
    ...rest
  } = props;
  const {
    shouldFormatToLocaleString = false,
    locale,
    maximumFractionDigits = 0
  } = localizationOptions;
  const {DECIMAL_NUMBER_SEPARATOR} = getNumberSeparators(locale);
  const inputContainerClassName = classNames("input-container", customClassName);
  const inputClassName = classNames("input", {
    "input--is-disabled": isDisabled,
    "input--has-error": hasError
  });
  const isNumberInput = type === "number";
  let finalValue = value;

  if (isNaN(Number(value))) {
    finalValue = "";
  }

  if (isNumberInput && value && shouldFormatToLocaleString) {
    const {
      IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
      MATCH_ZEROS_AFTER_DECIMAL_REGEX
    } = generateNumberRegExps(locale);
    const numberFormatter = formatNumber({
      providedOptions: {
        maximumFractionDigits,
        locale
      }
    });

    // Number() parse disappear decimal separator, provides 1234.56 format for numberFormatter
    if (
      IS_LAST_CHARACTER_DECIMAL_POINT_REGEX.test(String(value)) ||
      MATCH_ZEROS_AFTER_DECIMAL_REGEX.test(String(value))
    ) {
      const decimalPart = String(value).split(DECIMAL_NUMBER_SEPARATOR)[1] || "";
      const integerPart = numberFormatter(
        Number(String(value).split(DECIMAL_NUMBER_SEPARATOR)[0])
      );

      finalValue = `${integerPart}${DECIMAL_NUMBER_SEPARATOR}${decimalPart}`;
    } else {
      finalValue = numberFormatter(Number(value));
    }
  }

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
        value={finalValue}
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
      const formattedNewValue = parseNumber({locale, maximumFractionDigits}, newValue);

      if (formattedNewValue !== newValue) {
        event.currentTarget.value = formattedNewValue;
      }
    }

    onChange(event);
  }
}
/* eslint-enable complexity */

export default Input;
