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
  const {NUMBER_WITH_THOUTHOUSANDTH_AND_DECIMAL_POINT_REGEX} = generateNumberRegExps(
    options.locale
  );
  const numerals = getLocaleNumerals(options.locale);
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const digitMapper = getDigit(new Map(numerals.map((d, i) => [d, i])));
  let parsedNumber = value
    .replace(new RegExp(`[${THOUSANDTHS_SEPARATOR}]`, "g"), "")
    .replace(new RegExp(`[${DECIMAL_NUMBER_SEPARATOR}]`), ".")
    .replace(numeral, digitMapper);

  // Prevents formats other than 1,234,567.89 (Multiple Thouthousandth & Single Decimal Separators)
  if (!parsedNumber.match(NUMBER_WITH_THOUTHOUSANDTH_AND_DECIMAL_POINT_REGEX)![0].length) {
    return parsedNumber.slice(0, parsedNumber.length - 1);
  }

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

function getLocaleNumerals(locale = navigator.language) {
  const numerals = [
    // eslint-disable-next-line no-magic-numbers
    ...new Intl.NumberFormat(locale, {useGrouping: false}).format(9876543210)
  ].reverse();

  return numerals;
}

function generateNumberRegExps(locale = navigator.language) {
  const {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR} = getNumberSeparators(locale);
  // const NUMERALS = `[${getLocaleNumerals(locale).join("")}]`;

  const IS_LAST_CHARACTER_DECIMAL_POINT_REGEX = new RegExp(
    `\\${DECIMAL_NUMBER_SEPARATOR}$`
  );
  const MATCH_ZEROS_AFTER_DECIMAL_REGEX = new RegExp(`\\${DECIMAL_NUMBER_SEPARATOR}0+$`);
  const NUMBER_WITH_THOUTHOUSANDTH_AND_DECIMAL_POINT_REGEX = new RegExp(
    `^-?([0-9]*,*)*\\.?[0-9]*$`
  );

  return {
    IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
    MATCH_ZEROS_AFTER_DECIMAL_REGEX,
    NUMBER_WITH_THOUTHOUSANDTH_AND_DECIMAL_POINT_REGEX
  };
}

export {formatNumber, parseNumber, getDigit, getNumberSeparators, generateNumberRegExps};
