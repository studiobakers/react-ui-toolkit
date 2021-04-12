import "./_number-input.scss";

import React, {useRef, RefObject} from "react";
import classNames from "classnames";

import Input, {InputProps} from "../Input";
import {numberToString} from "../../../core/utils/number/numberUtils";
import {
  NOT_INTEGER_FIRST_CHARACTER_OF_STRING_REGEX,
  NOT_NUMBER_NOR_DECIMAL_POINT_REGEX,
  PRECISION_REGEX,
  IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
  DECIMAL_NUMBER_SEPARATOR,
  THOUSANDTHS_SEPARATOR
} from "../../../core/utils/number/numberConstants";
import {KEYBOARD_EVENT_KEY} from "../../../core/utils/keyboard-event/keyboardEventConstants";

export interface NumberInputProps {
  testid: string;
  name: string;
  onChange: React.ReactEventHandler<HTMLInputElement>;
  value: string;
  title?: string;
  min?: number;
  max?: number;
  maxFractionDigits?: number;
  placeholder?: string;
  customClassName?: string;
  leftIcon?: React.ReactNode;
  shouldFormatToLocaleString?: boolean;
  onFocus?: InputProps["onFocus"];
  onKeyDown?: InputProps["onKeyDown"];
  prefixIconToValue?: string;
  isDisabled?: boolean;
  hasError?: boolean;
}

function NumberInput({
  testid,
  name,
  title,
  value,
  min,
  max,
  maxFractionDigits = 0,
  onChange,
  hasError,
  placeholder,
  customClassName,
  leftIcon,
  shouldFormatToLocaleString = false,
  onFocus,
  onKeyDown,
  prefixIconToValue,
  isDisabled
}: NumberInputProps) {
  const className = classNames("number-input", customClassName, {
    "can-be-formatted-to-locale-string": shouldFormatToLocaleString
  });
  const containerRef = useRef() as RefObject<HTMLDivElement>;

  let finalValue = value;

  if (value && shouldFormatToLocaleString) {
    finalValue = numberToString(finalValue);
  }

  if (finalValue && prefixIconToValue && !finalValue.includes(prefixIconToValue)) {
    finalValue = `${prefixIconToValue} ${finalValue}`;
  }

  return (
    <Input
      inputContainerRef={containerRef}
      testid={testid}
      customClassName={className}
      type={"text"}
      title={title}
      name={name}
      onChange={handleChange}
      value={finalValue || ""}
      leftIcon={leftIcon}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      isDisabled={isDisabled}
      hasError={hasError}
      min={min}
      max={max}
    />
  );

  function handleBlur(event: React.SyntheticEvent<HTMLInputElement>) {
    let {value: newValue} = event.currentTarget;

    if (typeof max === "number" && parseFloat(value) > max) {
      newValue = String(max);
    }

    if (typeof min === "number" && parseFloat(value) < min) {
      newValue = String(min);
    }

    if (newValue !== event.currentTarget.value) {
      event.currentTarget.value = newValue;
      onChange(event);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    switch (event.key) {
      case KEYBOARD_EVENT_KEY.ARROW_LEFT:
      case KEYBOARD_EVENT_KEY.ARROW_RIGHT:
      case KEYBOARD_EVENT_KEY.ARROW_UP:
      case KEYBOARD_EVENT_KEY.ARROW_DOWN:
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (onFocus) {
      onFocus(event);
    }

    if (shouldFormatToLocaleString && containerRef.current) {
      const inputElem = event.currentTarget;

      if (inputElem) {
        setTimeout(() => {
          inputElem.setSelectionRange(inputElem.value.length, inputElem.value.length);
        });
      }
    }
  }

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
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

    onChange(event);
  }
}

export default NumberInput;
