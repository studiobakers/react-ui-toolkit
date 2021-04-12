import {
  IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
  MATCH_ZEROS_AFTER_DECIMAL_REGEX,
  DECIMAL_NUMBER_SEPARATOR
} from "./numberConstants";

/**
 * Coerces a number into a string.
 * @param {number} value A number to convert to string
 * @param {string} locale Default locale used is "en"
 * @return {string} The value after coercing the given value to a string.
 */
function numberToString(value: unknown, locale = "en") {
  let final = "";

  if (typeof value === "number" && !Object.is(value, NaN)) {
    final = value.toLocaleString(locale);
  } else if (typeof value === "string") {
    final = parseFloat(value).toLocaleString(locale);

    // If the value is `"[0-9]."` or `[0-9].0+"
    if (
      IS_LAST_CHARACTER_DECIMAL_POINT_REGEX.test(value) ||
      MATCH_ZEROS_AFTER_DECIMAL_REGEX.test(value)
    ) {
      const decimalNumberParts = value.split(DECIMAL_NUMBER_SEPARATOR);
      const decimalPart = decimalNumberParts[1];
      const integerPart = parseFloat(decimalNumberParts[0]).toLocaleString(locale);

      final = `${integerPart}${DECIMAL_NUMBER_SEPARATOR}${decimalPart}`;
    }
  }

  return final;
}

/**
 * @param {number} x number to check
 * @return {boolean} Whether x is an integer or not
 */
function isInteger(x: number): boolean {
  return String(x).split(".")[1] === undefined;
}

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
 * Checks if a number is either 29, 30 or 31.
 * @param {number} x
 */
function isNumber29or30or31(x: number): boolean {
  // eslint-disable-next-line no-magic-numbers
  return x === 29 || x === 30 || x === 31;
}

function isNumberInRange(range: [number, number], x: number): boolean {
  return range[0] <= x && x <= range[1];
}

function formatNumber(
  providedOptions: Omit<Intl.NumberFormatOptions, "style"> & {
    style?: Intl.NumberFormatPartTypes;
  } = {}
) {
  let options = providedOptions;

  if (options.style === "currency") {
    options = {currency: "USD", maximumFractionDigits: 2, ...providedOptions};
  }

  const numberFormatter = new Intl.NumberFormat("en", options);

  return (value: number) => {
    let formattedValue = "";

    if (!Object.is(value, NaN)) {
      formattedValue = numberFormatter.format(value);
    }

    return formattedValue;
  };
}

function formatPrice(
  options: {
    currencySymbol?: string;
    style?: Intl.NumberFormatPartTypes;
    maximumFractionDigits?: number;
  } = {
    currencySymbol: "US $",
    style: "currency",
    maximumFractionDigits: 2
  }
) {
  const priceFormatter = formatNumber({
    style: options.style,
    maximumFractionDigits: options.maximumFractionDigits
  });

  return ({
    value,
    fallback = ""
  }: {
    value: null | undefined | string | number;
    fallback?: string;
  }) => {
    let formattedValue = fallback;

    if (value != null) {
      let numericValue;

      if (typeof value === "string") {
        numericValue = Number(value);
      } else {
        numericValue = value;
      }

      const formattedNumber = priceFormatter(numericValue);

      formattedValue = options.currencySymbol
        ? `${options.currencySymbol}${formattedNumber.split("$")[1]}`
        : formattedNumber;
    }

    return formattedValue;
  };
}

function getPercentage(total: number, x: number): number {
  // eslint-disable-next-line no-magic-numbers
  return (100 * x) / total;
}

export {
  numberToString,
  truncateDecimalPart,
  isNumber29or30or31,
  isNumberInRange,
  formatNumber,
  formatPrice,
  getPercentage
};
