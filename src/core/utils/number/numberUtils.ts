import {
  NOT_NUMBER_OR_DECIMAL_POINT_REGEX
} from "./numberConstants";
import {FormatNumberOptions, ParseNumberOptions} from "./numberTypes";

function formatNumber({providedOptions}: FormatNumberOptions) {
  const {locale, ...otherOptions} = providedOptions;
  const options = {
    style: "decimal",
    ...otherOptions
  };

  let numberFormatter: {
    format: (x: number | bigint) => string;
  };

  try {
    numberFormatter = new Intl.NumberFormat(
      locale || [navigator.language, "en-GB"],
      options
    );
  } catch (error) {
    numberFormatter = {
      format(x: number | bigint) {
        return x.toLocaleString(locale);
      }
    };
  }

  return (value: number) => {
    let formattedValue = "";

    if (!Object.is(value, NaN)) {
      formattedValue = numberFormatter.format(value);
    }

    return formattedValue;
  };
}

/**
 * Coerces a number scientific notation. {@link https://observablehq.com/@mbostock/localized-number-parsing | Reference}
 * @param {object} options - An object includes parse number options
 * @param {string} options.locale - Default locale used is browser locale
 * @param {number} options.maximumFractionDigits - The maximum digit a decimal can have
 * @param {number} value - A number to convert to string
 * @returns {string} The value after coercing the given value to a scientific notation.
 */
function parseNumber(
  options: ParseNumberOptions = {locale: navigator.language, maximumFractionDigits: 0},
  value: string
) {
  const {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR} = getNumberSeparators(
    options.locale
  );
  const numerals = [
    // eslint-disable-next-line no-magic-numbers
    ...new Intl.NumberFormat(options.locale, {useGrouping: false}).format(9876543210)
  ].reverse();
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const digitMapper = getDigit(new Map(numerals.map((d, i) => [d, i])));
  let parsedNumber = value
    .replace(new RegExp(NOT_NUMBER_OR_DECIMAL_POINT_REGEX), "")
    .replace(new RegExp(`[${THOUSANDTHS_SEPARATOR}]`, "g"), "")
    .replace(new RegExp(`[${DECIMAL_NUMBER_SEPARATOR}]`), ".")
    .replace(numeral, digitMapper);

  if (options.maximumFractionDigits > 0) {
    const decimalPart = parsedNumber.split(DECIMAL_NUMBER_SEPARATOR)[1];

    if (decimalPart && decimalPart.length === options.maximumFractionDigits + 1) {
      return parsedNumber.slice(0, parsedNumber.length - 1);
    }
  } else {
    parsedNumber = String(parseInt(parsedNumber));
  }

  return parsedNumber;
}

function getDigit(digitMap: Map<string, number>) {
  return (d: string) => {
    const digit = digitMap.get(d);

    return typeof digit === "number" ? String(digit) : "";
  };
}

function getNumberSeparators(locale = navigator.language) {
  // eslint-disable-next-line no-magic-numbers
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const THOUSANDTHS_SEPARATOR = parts.find((d) => d.type === "group")!.value;
  const DECIMAL_NUMBER_SEPARATOR = parts.find((d) => d.type === "decimal")!.value;

  return {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR};
}

export {formatNumber, parseNumber, getDigit, getNumberSeparators};
