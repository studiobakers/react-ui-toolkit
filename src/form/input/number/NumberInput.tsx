import classNames from "classnames";
import React from "react";

import Input from "../Input";
import {NumberInputProps} from "./util/numberInputTypes";
import {
  delocalizeNumberInputValue,
  getIsValidNumberInputMaxFractionDigits,
  getNumberInputFormatProps,
  getNumberInputParseNumberOptions,
  localizeNumberInputValue
} from "./util/numberInputUtils";

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const {
    formatProps = {},
    maximumFractionDigits = 0,
    value,
    onChange,
    inputMode = "decimal",
    customClassName,
    ...rest
  } = props;

  if (!getIsValidNumberInputMaxFractionDigits({maximumFractionDigits})) {
    throw new Error("maximumFractionDigits should be zero or a positive integer.");
  }

  const {
    locale,
    shouldFormatToLocaleString,
    DECIMAL_NUMBER_SEPARATOR: decimalSeparatorForLocale,
    MINUS_SIGN: minusSignForLocale,
    LOCALE_NEGATIVE_ZERO: negativeZeroForLocale
  } = getNumberInputFormatProps(formatProps);
  const parseNumberOptions = getNumberInputParseNumberOptions({
    locale,
    maximumFractionDigits
  });
  const finalValue = localizeNumberInputValue({
    value,
    formatProps: {
      locale,
      shouldFormatToLocaleString
    },
    signProps: {
      decimalSeparatorForLocale,
      minusSignForLocale,
      negativeZeroForLocale
    },
    maximumFractionDigits
  });

  return (
    <Input
      ref={ref}
      customClassName={classNames(customClassName, "number-input")}
      type={"text"}
      onChange={handleChange}
      value={finalValue}
      {...rest}
    />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (event.currentTarget.value) {
      event.currentTarget.value = delocalizeNumberInputValue({
        value,
        event,
        formatProps,
        parseNumberOptions,
        maximumFractionDigits
      });
    }

    onChange(event);
  }
});

export default NumberInput;
