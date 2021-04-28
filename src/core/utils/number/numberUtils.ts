import {
  IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
  MATCH_ZEROS_AFTER_DECIMAL_REGEX,
  DECIMAL_NUMBER_SEPARATOR,
  THOUSANDTHS_SEPARATOR
} from "./numberConstants";

/**
 * Coerces a number into a string.
 * @param {number} value - A number to convert to string
 * @param {number} maxFractionDigits - The decimal part length
 * @param {string} locale - Default locale used is "en"
 * @returns {string} The value after coercing the given value to a string.
 */
function numberToString(
  value: number | string,
  maxFractionDigits: number,
  locale = "en"
) {
  let final = "";

  if (typeof value === "number" && !Object.is(value, NaN)) {
    final = value.toLocaleString(locale);
  } else if (typeof value === "string") {
    if (!value.includes(DECIMAL_NUMBER_SEPARATOR)) {
      final = parseFloat(value).toLocaleString(locale);
    }

    // If the value is `"[0-9]."` or `[0-9].0+"
    else if (
      IS_LAST_CHARACTER_DECIMAL_POINT_REGEX.test(value) ||
      MATCH_ZEROS_AFTER_DECIMAL_REGEX.test(value) ||
      value.includes(DECIMAL_NUMBER_SEPARATOR)
    ) {
      const decimalNumberParts = value.split(DECIMAL_NUMBER_SEPARATOR);
      const decimalPart = decimalNumberParts[1];
      const integerPart = parseFloat(decimalNumberParts[0]).toLocaleString(locale);

      if (decimalPart.length > maxFractionDigits) {
        const trimmedDecimalPart = decimalPart.slice(0, maxFractionDigits);

        final = `${integerPart}${DECIMAL_NUMBER_SEPARATOR}${new Intl.NumberFormat(
          locale
        ).format(Number(trimmedDecimalPart))}`;
      } else {
        final = `${integerPart}${DECIMAL_NUMBER_SEPARATOR}${new Intl.NumberFormat(locale)
          .format(Number(decimalPart))
          .replace(DECIMAL_NUMBER_SEPARATOR, "")
          .replace(THOUSANDTHS_SEPARATOR, "")}`;
      }
    }
  }

  return final;
}

function parseNumber(value: number | string, locale = navigator.language) {
  // eslint-disable-next-line no-magic-numbers
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const numerals = [
    // eslint-disable-next-line no-magic-numbers
    ...new Intl.NumberFormat(locale, {useGrouping: false}).format(9876543210)
  ].reverse();

  const group = new RegExp(`[${parts.find((d) => d.type === "group")?.value}]`, "g");
  const decimal = new RegExp(`[${parts.find((d) => d.type === "decimal")?.value}]`);
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");

  const digitMapper = getDigit(new Map(numerals.map((d, i) => [d, i])));

  return value
    .toString()
    .trim()
    .replace(group, "")
    .replace(decimal, ".")
    .replace(numeral, digitMapper);

  function getDigit(digitMap: Map<string, number>) {
    return (d: string) => {
      const digit = digitMap.get(d);

      return typeof digit === "number" ? String(digit) : "";
    };
  }
}
export {numberToString, parseNumber};
