import {
  DEFAULT_DECIMAL_NUMBER_SEPARATOR,
  DEFAULT_MINUS_SIGN,
  DEFAULT_NUMERALS,
  DEFAULT_THOUSANDTHS_SEPARATOR
} from "./numberConstants";
import {FormatNumberOptions, ParseNumberOptions} from "./numberTypes";

/**
 * @param {number} limit The number of digits in decimal part of a number
 * @return {function} A function that takes in a number and returns the truncated version of it
 */
function truncateDecimalPart(limit: number) {
  return (x: number) => {
    let finalNumber = x || 0;

    if (!isInteger(finalNumber)) {
      finalNumber = parseFloat(finalNumber.toFixed(limit));
    }

    return finalNumber;
  };
}

/**
 * @param {number} x number to check
 * @return {boolean} Whether x is an integer or not
 */
function isInteger(x: number): boolean {
  return x % 1 === 0;
}
const NAVIGATOR_LANGUAGE =
  // eslint-disable-next-line no-negated-condition
  typeof navigator !== "undefined" ? navigator.language : "en-GB";

function formatNumber(formatNumberOptions: FormatNumberOptions) {
  const {locale, ...otherOptions} = formatNumberOptions;
  const options = {
    style: "decimal",
    ...otherOptions
  };

  let numberFormatter: {
    format: (x: number | bigint) => string;
  };

  try {
    numberFormatter = new Intl.NumberFormat(
      locale || [NAVIGATOR_LANGUAGE, "en-GB"],
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
 * Coerces a number to scientific notation. {@link https://observablehq.com/@mbostock/localized-number-parsing | Reference}
 * @param {object} options - An object includes parse number options
 * @param {string} options.locale - Default locale used is browser locale
 * @param {number} options.maximumFractionDigits - The maximum digit a decimal can have
 * @param {number} value - A number to convert to string
 * @returns {string} The value after coercing the given value to a scientific notation.
 */
function parseNumber(options: ParseNumberOptions, value: string) {
  const {locale = NAVIGATOR_LANGUAGE, maximumFractionDigits = 0} = options;
  const {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR} = getNumberSeparators(locale);
  const numerals = getLocaleNumerals(locale);
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const digitMapper = getDigit(new Map(numerals.map((d, i) => [d, i])));
  let parsedNumber = value
    .replace(" ", "")
    .replace(new RegExp(`[${THOUSANDTHS_SEPARATOR}]`, "g"), "")
    .replace(new RegExp(`[${DECIMAL_NUMBER_SEPARATOR}]`), ".")
    .replace(numeral, digitMapper);

  if (typeof maximumFractionDigits === "number") {
    const [integerPart, decimalPart] = parsedNumber.split(".");

    if (maximumFractionDigits === 0) {
      parsedNumber = integerPart;
    } else if (decimalPart && decimalPart.length === maximumFractionDigits + 1) {
      return parsedNumber.slice(0, parsedNumber.length - 1);
    }
  } else {
    parsedNumber = String(parsedNumber);
  }

  return parsedNumber;
}

function getDigit(digitMap: Map<string, number>) {
  return (d: string) => {
    const digit = digitMap.get(d);

    return typeof digit === "number" ? String(digit) : "";
  };
}

function mapDigitsToLocalVersion(
  {locale = NAVIGATOR_LANGUAGE}: {locale?: string},
  digits: string
) {
  return digits.split("").map(mapDigitToLocalVersion({locale})).join("");
}

function mapDigitToLocalVersion({locale = NAVIGATOR_LANGUAGE}: {locale?: string}) {
  const numerals = getLocaleNumerals(locale);
  const digitMap = new Map(numerals.map((d, i) => [i, d]));

  return (digit: string) => digitMap.get(parseInt(digit));
}

function getNumberSeparators(locale = NAVIGATOR_LANGUAGE) {
  let THOUSANDTHS_SEPARATOR = DEFAULT_THOUSANDTHS_SEPARATOR;
  let DECIMAL_NUMBER_SEPARATOR = DEFAULT_DECIMAL_NUMBER_SEPARATOR;
  let MINUS_SIGN = DEFAULT_MINUS_SIGN;

  if (new Intl.NumberFormat().formatToParts()) {
    // eslint-disable-next-line no-magic-numbers
    const parts = new Intl.NumberFormat(locale).formatToParts(-12345.6);

    THOUSANDTHS_SEPARATOR = parts.find((d) => d.type === "group")!.value;
    DECIMAL_NUMBER_SEPARATOR = parts.find((d) => d.type === "decimal")!.value;
    MINUS_SIGN = parts.find((d) => d.type === "minusSign")!.value;
  }

  return {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR, MINUS_SIGN};
}

function getLocaleNumerals(locale = NAVIGATOR_LANGUAGE) {
  let numerals = DEFAULT_NUMERALS;

  if (new Intl.NumberFormat()) {
    numerals = new Intl.NumberFormat(locale, {useGrouping: false})
      // eslint-disable-next-line no-magic-numbers
      .format(9876543210)
      .split("")
      .reverse();
  }

  return numerals;
}

/**
 * @returns Scientific and locale presentations of "-0" and "-00" values
 */
function getNegativeZero(locale = NAVIGATOR_LANGUAGE) {
  const LOCALE_ZERO = getLocaleNumerals(locale)[0];
  const LOCALE_MINUS_SIGN = getNumberSeparators(locale).MINUS_SIGN;

  return {
    LOCALE_NEGATIVE_ZERO: `${LOCALE_MINUS_SIGN}${LOCALE_ZERO}`,
    LOCALE_NEGATIVE_DOUBLE_ZERO: `${LOCALE_MINUS_SIGN}${LOCALE_ZERO}${LOCALE_ZERO}`,
    DEFAULT_NEGATIVE_ZERO: "-0",
    DEFAULT_NEGATIVE_DOUBLE_ZERO: "-00"
  };
}

function removeLeadingZeros(locale = NAVIGATOR_LANGUAGE, value: string) {
  const {
    LOCALE_NEGATIVE_ZERO,
    LOCALE_NEGATIVE_DOUBLE_ZERO,
    DEFAULT_NEGATIVE_ZERO,
    DEFAULT_NEGATIVE_DOUBLE_ZERO
  } = getNegativeZero(locale);
  const LOCALE_MINUS_SIGN = getNumberSeparators(locale).MINUS_SIGN;
  const decimalPart = value.split(".")[1];
  let integerPart = value.split(".")[0];
  let finalValue;

  // -00 is not a valid number but -0 can have decimal numbers like -0.25
  if (
    integerPart === LOCALE_NEGATIVE_DOUBLE_ZERO ||
    integerPart === DEFAULT_NEGATIVE_DOUBLE_ZERO
  ) {
    integerPart = DEFAULT_NEGATIVE_ZERO;
  }

  // parseInt returns absolute value for minus sign, 0, -0
  if (
    integerPart &&
    integerPart.length !== String(parseInt(integerPart)).length &&
    integerPart !== LOCALE_MINUS_SIGN &&
    integerPart !== LOCALE_NEGATIVE_ZERO &&
    integerPart !== DEFAULT_NEGATIVE_ZERO
  ) {
    integerPart = String(parseInt(integerPart));
  }

  if (value.match(/\.$/)?.length || decimalPart) {
    finalValue = `${integerPart}.${decimalPart}`;
  } else {
    finalValue = integerPart;
  }

  return finalValue;
}

function getThousandthSeparatorCount(value: string) {
  return formatNumber({locale: "en"})(parseFloat(value)).match(/,/g)?.length || 0;
}

function isNonNegativeNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x) && x >= 0;
}

export {
  truncateDecimalPart,
  isInteger,
  formatNumber,
  parseNumber,
  getDigit,
  getNumberSeparators,
  getNegativeZero,
  mapDigitsToLocalVersion,
  removeLeadingZeros,
  getThousandthSeparatorCount,
  isNonNegativeNumber
};
