import "./_input.scss";

import React, {useState, useEffect} from "react";
import classNames from "classnames";

import {
  getNumberSeparators,
  parseNumber,
  mapDigitsToLocalVersion,
  formatNumber,
  removeLeadingZeros,
  getNegativeZero
} from "../../core/utils/number/numberUtils";

export type InputTypes =
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
    {DECIMAL_NUMBER_SEPARATOR: decimalSeparatorForLocale, MINUS_SIGN: minusSignForLocale},
    setNumberSeparatorsForLocale
  ] = useState(() => getNumberSeparators(locale));
  const [
    {LOCALE_NEGATIVE_ZERO: negativeZeroForLocale},
    setNegativeZeroForLocale
  ] = useState(() => getNegativeZero(locale));
  const isNumberInput = type === "number";
  const inputContainerClassName = classNames(
    "input-container",
    customClassName,
    `input-container--type-${type}`
  );
  const inputClassName = classNames("input", {
    "input--is-disabled": isDisabled,
    "input--has-error": hasError
  });
  let finalValue = value;

  if (
    !(
      typeof maximumFractionDigits === "number" &&
      Number.isInteger(maximumFractionDigits) &&
      maximumFractionDigits >= 0
    )
  ) {
    throw new Error("maximumFractionDigits should be zero or a positive integer.");
  }

  if (isNumberInput && typeof value === "string" && shouldFormatToLocaleString) {
    const [integerPart, decimalPart] = String(value).split(".");
    const numberFormatter = formatNumber({
      maximumFractionDigits,
      locale
    });

    // IF there is a decimal part or the value ends with ".",
    // make sure we add the decimal separator and map each digit on the decimal part to localized versions.
    // We shouldn't use parseInt or parseFloat with numberFormat util here because that removes zeros on the decimal part and disallows users to write something like: 10.01 or 10.102
    if (value.match(/\.$/)?.length || decimalPart) {
      finalValue = `${numberFormatter(
        parseInt(integerPart)
      )}${decimalSeparatorForLocale}${mapDigitsToLocalVersion({locale}, decimalPart)}`;
    } else if (integerPart) {
      if (integerPart !== minusSignForLocale && integerPart !== negativeZeroForLocale) {
        finalValue = numberFormatter(parseInt(integerPart));
      } else {
        finalValue = `${minusSignForLocale}${mapDigitsToLocalVersion(
          {locale},
          integerPart
        )}`;
      }
    }
  }

  useEffect(() => {
    setNumberSeparatorsForLocale(getNumberSeparators(locale));
    setNegativeZeroForLocale(getNegativeZero(locale));
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

      if (newValue) {
        const formattedNewValue = parseNumber({locale, maximumFractionDigits}, newValue);
        // Number("-") returns NaN. Should allow minus sign as first character.
        const isFormattedNewValueNotAValidNumber =
          (newValue !== "-" && Number.isNaN(Number(formattedNewValue))) ||
          formattedNewValue === "";
        let finalEventValue = formattedNewValue ? String(formattedNewValue) : "";

        // IF the parsed number is a valid and there is a decimal separator,
        // we need to save the number as it is so that decimal part doesn't disappear
        if (!isFormattedNewValueNotAValidNumber && formattedNewValue.match(/./)?.length) {
          finalEventValue = String(formattedNewValue);
        } else if (isFormattedNewValueNotAValidNumber) {
          finalEventValue = value as string | "";
        }

        // IF 'shouldFormatToLocaleString' or 'maximumFractionDigits' are defined or the value is negative,
        // value can't have leading zeros. Like 0,000,123 or 010.50 or -00
        if (
          !isFormattedNewValueNotAValidNumber &&
          (shouldFormatToLocaleString ||
            maximumFractionDigits > 0 ||
            finalEventValue.includes("-"))
        ) {
          finalEventValue = removeLeadingZeros(locale, finalEventValue);
        }

        // IF maximumFractionDigits is set as 0, value can not be negative zero
        if (maximumFractionDigits === 0 && finalEventValue === "-0") {
          finalEventValue = value as string;
        }

        event.currentTarget.value = finalEventValue;
      }
    }

    onChange(event);
  }
}
/* eslint-enable complexity */

export default Input;
