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

export {numberToString};
