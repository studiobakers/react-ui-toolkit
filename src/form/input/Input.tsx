import "./_input.scss";

import React from "react";
import classNames from "classnames";

import {
  DECIMAL_NUMBER_SEPARATOR,
  IS_LAST_CHARACTER_DECIMAL_POINT_REGEX
} from "../../core/utils/number/numberConstants";
import {formatNumber, parseNumber} from "../../core/utils/number/numberUtils";

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
  const inputContainerClassName = classNames("input-container", customClassName);
  const inputClassName = classNames("input", {
    "input--is-disabled": isDisabled,
    "input--has-error": hasError
  });
  const isNumberInput = type === "number";
  let finalValue = value;

  if (isNumberInput && value && shouldFormatToLocaleString) {
    finalValue = formatNumber({
      maximumFractionDigits,
      locale
    })(Number(value));

    if (IS_LAST_CHARACTER_DECIMAL_POINT_REGEX.test(value.toString())) {
      finalValue += DECIMAL_NUMBER_SEPARATOR;
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

      let formattedNewValue = parseNumber(newValue, locale);

      if (maximumFractionDigits > 0) {
        const decimalPart = newValue.split(DECIMAL_NUMBER_SEPARATOR)[1];

        if (decimalPart && decimalPart.length === maximumFractionDigits + 1) {
          return;
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
