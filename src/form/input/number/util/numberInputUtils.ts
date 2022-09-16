import React from "react";

import {isMobileDevice} from "../../../../core/utils/device/deviceUtils";
import {ParseNumberOptions} from "../../../../core/utils/number/numberTypes";
import {
  formatNumber,
  getNegativeZero,
  getNumberSeparators,
  getThousandthSeparatorCount,
  isIntlAPISupported,
  mapDigitsToLocalVersion,
  parseNumber,
  removeLeadingZeros
} from "../../../../core/utils/number/numberUtils";
import {NumberInputFormatProps, NumberInputLocaleProps} from "./numberInputTypes";

function isNumberInputLocalizationAllowed() {
  try {
    // We should only activate it for desktops and if `Intl` API is supported
    return !isMobileDevice() && isIntlAPISupported();
  } catch (error) {
    return false;
  }
}

function getNumberInputFormatProps(formatProps: NumberInputFormatProps) {
  return isNumberInputLocalizationAllowed()
    ? {
        ...formatProps,
        ...getNumberSeparators(formatProps.locale),
        ...getNegativeZero(formatProps.locale)
      }
    : {
        locale: undefined,
        shouldFormatToLocaleString: false,
        DECIMAL_NUMBER_SEPARATOR: undefined,
        MINUS_SIGN: undefined,
        LOCALE_NEGATIVE_ZERO: undefined
      };
}

function getNumberInputParseNumberOptions(
  options: ParseNumberOptions
): ParseNumberOptions {
  return isNumberInputLocalizationAllowed()
    ? options
    : {
        ...options,
        locale: "en-US"
      };
}

function isNumberInputValueNotAValidNumber({
  eventValue,
  formattedValue
}: {
  eventValue: string;
  formattedValue: string;
}) {
  return (
    formattedValue === "" || (eventValue !== "-" && Number.isNaN(Number(formattedValue)))
  );
}

function getIsValidNumberInputMaxFractionDigits({
  maximumFractionDigits
}: {
  maximumFractionDigits: number;
}) {
  return Number.isInteger(maximumFractionDigits) && maximumFractionDigits >= 0;
}

function localizeNumberInputValue({
  value,
  formatProps,
  signProps,
  maximumFractionDigits
}: {
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  formatProps: NumberInputFormatProps;
  signProps: NumberInputLocaleProps;
  maximumFractionDigits: number;
}) {
  const {locale, shouldFormatToLocaleString} = formatProps;
  const {
    decimalSeparatorForLocale,
    minusSignForLocale,
    negativeZeroForLocale
  } = signProps;
  let finalValue = value;

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

  return finalValue;
}

function delocalizeNumberInputValue({
  value,
  event,
  formatProps,
  parseNumberOptions,
  maximumFractionDigits
}: {
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  event: React.SyntheticEvent<HTMLInputElement>;
  formatProps: NumberInputFormatProps;
  parseNumberOptions: ParseNumberOptions;
  maximumFractionDigits: number;
}) {
  const {locale, shouldFormatToLocaleString} = getNumberInputFormatProps(formatProps);
  const eventValue = event.currentTarget.value;
  const formattedNewValue = parseNumber(parseNumberOptions, eventValue);
  let finalEventValue = formattedNewValue ? String(formattedNewValue) : "";
  // Number("-") returns NaN. Should allow minus sign as first character.
  const isAValidNumber = !isNumberInputValueNotAValidNumber({
    eventValue,
    formattedValue: formattedNewValue
  });

  // IF the parsed number is valid and there is a decimal separator,
  // we need to save the number as it is so that decimal part doesn't disappear
  if (isAValidNumber && formattedNewValue.match(/./)?.length) {
    finalEventValue = String(formattedNewValue);
  } else if (!isAValidNumber) {
    // IF the parsed number is not valid, we revert back to the valid value
    finalEventValue = value as string;
  }

  // IF 'shouldFormatToLocaleString' or 'maximumFractionDigits' are defined or the value is negative,
  // value can't have leading zeros. Like 0,000,123 or 010.50 or -00
  if (
    isAValidNumber &&
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
      } else if (prevValueThousandthsSeparatorCount === thousandthsSeparatorCount - 1) {
        caret += 1;
      }

      window.requestAnimationFrame(() => {
        element.selectionStart = caret;
        element.selectionEnd = caret;
      });
    }
  }

  return finalEventValue;
}

export {
  getNumberInputFormatProps,
  getNumberInputParseNumberOptions,
  getIsValidNumberInputMaxFractionDigits,
  isNumberInputValueNotAValidNumber,
  localizeNumberInputValue,
  delocalizeNumberInputValue
};
