import React from "react";

import Input from "../Input";
import {NumberInputProps} from "./util/numberInputTypes";
import {
  formatNumber,
  getThousandthSeparatorCount,
  mapDigitsToLocalVersion,
  parseNumber,
  removeLeadingZeros
} from "../../../core/utils/number/numberUtils";
import {
  getNumberInputFormatProps,
  getNumberInputParseNumberOptions
} from "./util/numberInputUtils";

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const {formatProps = {}, maximumFractionDigits = 0, value, onChange, ...rest} = props;
  const {
    locale,
    shouldFormatToLocaleString,
    DECIMAL_NUMBER_SEPARATOR: decimalSeparatorForLocale,
    MINUS_SIGN: minusSignForLocale,
    LOCALE_NEGATIVE_ZERO: negativeZeroForLocale
  } = getNumberInputFormatProps(formatProps);
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

  if (typeof value === "string" && shouldFormatToLocaleString) {
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

  return (
    <Input ref={ref} type={"text"} onChange={handleChange} value={finalValue} {...rest} />
  );

  /* eslint-disable complexity */
  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const {value: newValue} = event.currentTarget;

    if (newValue) {
      const formattedNewValue = parseNumber(
        getNumberInputParseNumberOptions({locale, maximumFractionDigits}),
        newValue
      );
      // Number("-") returns NaN. Should allow minus sign as first character.
      const isFormattedNewValueNotAValidNumber =
        formattedNewValue === "" ||
        (newValue !== "-" && Number.isNaN(Number(formattedNewValue)));
      let finalEventValue = formattedNewValue ? String(formattedNewValue) : "";

      // IF the parsed number is valid and there is a decimal separator,
      // we need to save the number as it is so that decimal part doesn't disappear
      if (!isFormattedNewValueNotAValidNumber && formattedNewValue.match(/./)?.length) {
        finalEventValue = String(formattedNewValue);
      } else if (isFormattedNewValueNotAValidNumber) {
        // IF the parsed number is not valid, we revert back to the valid value
        finalEventValue = value as string;
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
        finalEventValue = "0";
      }

      // IF shouldFormatToLocaleString is defined, caret position should calculate according to thoudsandths separator count
      if (shouldFormatToLocaleString) {
        const thousandthsSeparatorCount = getThousandthSeparatorCount(finalEventValue);
        const prevValueThousandthsSeparatorCount = getThousandthSeparatorCount(
          value as string
        );
        const element = event.currentTarget;
        let caret = event.currentTarget.selectionStart || 0;

        if (
          finalEventValue &&
          (String(value).length === finalEventValue.length + 1 ||
            String(value).length === finalEventValue.length - 1)
        ) {
          if (prevValueThousandthsSeparatorCount === thousandthsSeparatorCount + 1) {
            caret -= 1;
          } else if (
            prevValueThousandthsSeparatorCount ===
            thousandthsSeparatorCount - 1
          ) {
            caret += 1;
          }

          window.requestAnimationFrame(() => {
            element.selectionStart = caret;
            element.selectionEnd = caret;
          });
        }
      }

      event.currentTarget.value = finalEventValue;
    }

    onChange(event);
  }
  /* eslint-enable complexity */
});

export default NumberInput;
