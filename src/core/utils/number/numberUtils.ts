import {FormatNumberOptions, ParseNumberOptions} from "./numberTypes";

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
  const numerals = getLocaleNumerals(options.locale);
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const digitMapper = getDigit(new Map(numerals.map((d, i) => [d, i])));
  let parsedNumber = value
    .replace(" ", "")
    .replace(new RegExp(`[${THOUSANDTHS_SEPARATOR}]`, "g"), "")
    .replace(new RegExp(`[${DECIMAL_NUMBER_SEPARATOR}]`), ".")
    .replace(numeral, digitMapper);

  if (typeof options.maximumFractionDigits === "number") {
    const [integerPart, decimalPart] = parsedNumber.split(".");

    if (options.maximumFractionDigits === 0) {
      parsedNumber = integerPart;
    } else if (decimalPart && decimalPart.length === options.maximumFractionDigits + 1) {
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
  {locale = navigator.language}: {locale?: string},
  digits: string
) {
  return digits.split("").map(mapDigitToLocalVersion({locale})).join("");
}

function mapDigitToLocalVersion({locale = navigator.language}: {locale?: string}) {
  const numerals = getLocaleNumerals(locale);
  const digitMap = new Map(numerals.map((d, i) => [i, d]));

  return (digit: string) => digitMap.get(parseInt(digit));
}

function getNumberSeparators(locale = navigator.language) {
  // eslint-disable-next-line no-magic-numbers
  const parts = new Intl.NumberFormat(locale).formatToParts(-12345.6);
  const THOUSANDTHS_SEPARATOR = parts.find((d) => d.type === "group")!.value;
  const DECIMAL_NUMBER_SEPARATOR = parts.find((d) => d.type === "decimal")!.value;
  const MINUS_SIGN = parts.find((d) => d.type === "minusSign")!.value;

  return {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR, MINUS_SIGN};
}

function getLocaleNumerals(locale = navigator.language) {
  const numerals = new Intl.NumberFormat(locale, {useGrouping: false})
    // eslint-disable-next-line no-magic-numbers
    .format(9876543210)
    .split("")
    .reverse();

  return numerals;
}

/**
 * @returns Scientific and locale presentations of "-0" and "-00" values
 */
function getNegativeZero(locale = navigator.language) {
  const LOCALE_ZERO = getLocaleNumerals(locale)[0];
  const LOCALE_MINUS_SIGN = getNumberSeparators(locale).MINUS_SIGN;

  return {
    LOCALE_NEGATIVE_ZERO: `${LOCALE_MINUS_SIGN}${LOCALE_ZERO}`,
    LOCALE_NEGATIVE_DOUBLE_ZERO: `${LOCALE_MINUS_SIGN}${LOCALE_ZERO}${LOCALE_ZERO}`,
    DEFAULT_NEGATIVE_ZERO: "-0",
    DEFAULT_NEGATIVE_DOUBLE_ZERO: "-00"
  };
}

function removeLeadingZeros(locale = navigator.language, value: string) {
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

function isNonNegativeInteger(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x) && x >= 0;
}

export {
  formatNumber,
  parseNumber,
  getDigit,
  getNumberSeparators,
  getNegativeZero,
  mapDigitsToLocalVersion,
  removeLeadingZeros,
  getThousandthSeparatorCount,
  isNonNegativeInteger
};
