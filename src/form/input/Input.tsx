import "./_input.scss";

import React, {useState, useEffect} from "react";
import classNames from "classnames";

import {
  formatNumber,
  getNumberSeparators,
  parseNumber
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
  const [
    {
      DECIMAL_NUMBER_SEPARATOR: decimalSeparatorForLocale,
      THOUSANDTHS_SEPARATOR: thousandthSeparatorForLocale
    },
    setNumberSeparatorsForLocale
  ] = useState(() => getNumberSeparators(locale));
  const inputContainerClassName = classNames("input-container", customClassName);
  const inputClassName = classNames("input", {
    "input--is-disabled": isDisabled,
    "input--has-error": hasError
  });
  const isNumberInput = type === "number";
  let finalValue = value;

  if (isNumberInput && value && shouldFormatToLocaleString) {
    const numberFormatter = formatNumber({
      providedOptions: {
        maximumFractionDigits,
        locale
      }
    });
    const decimalPart = String(value).split(".")[1] || "";
    const integerPart = numberFormatter(parseInt(String(value)));

    // IF there is a decimal part or the value ends with ".", make sure we add the decimal separator
    if (String(value).match(/\.$/)?.length || decimalPart) {
      let formattedDecimalPart = decimalPart;

      if (decimalPart) {
        formattedDecimalPart = numberFormatter(parseInt(decimalPart)).replace(
          new RegExp(`[${thousandthSeparatorForLocale}]`),
          ""
        );
      }
      finalValue = `${integerPart}${decimalSeparatorForLocale}${formattedDecimalPart}`;
    } else if (integerPart) {
      finalValue = integerPart;
    }
  }

  useEffect(() => {
    setNumberSeparatorsForLocale(getNumberSeparators(locale));
  }, [locale]);

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
      const isFormattedNewValueNotAValidNumber = Number.isNaN(Number(formattedNewValue));
      let finalEventValue = formattedNewValue ? String(Number(formattedNewValue)) : "";

      // IF the parsed number is a valid and there is a decimal separator, we need to save the number as it is so that decimal part doesn't disappear
      if (!isFormattedNewValueNotAValidNumber && formattedNewValue.match(/./)?.length) {
        finalEventValue = String(formattedNewValue);
      } else if (isFormattedNewValueNotAValidNumber) {
        finalEventValue = value as string;
      }

      event.currentTarget.value = finalEventValue;
    }

    onChange(event);
  }
}
/* eslint-enable complexity */

export default Input;
