function formatNumber(
  providedOptions: Omit<Intl.NumberFormatOptions, "style"> & {
    locale?: string;
  } = {}
) {
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

    if (formattedValue && options.currency === "USD") {
      // in case `narrowSymbol` option was failed, make sure "US$" sign appears as just "$"
      formattedValue = formattedValue.replace("US$", "$");
    }

    return formattedValue;
  };
}

/**
 * Coerces a number scientific notation. {@link https://observablehq.com/@mbostock/localized-number-parsing|Reference}
 * @param {number} value - A number to convert to string
 * @param {string} locale - Default locale used is browser locale
 * @returns {string} The value after coercing the given value to a scientific notation.
 */
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
}

function getDigit(digitMap: Map<string, number>) {
  return (d: string) => {
    const digit = digitMap.get(d);

    return typeof digit === "number" ? String(digit) : "";
  };
}

export {formatNumber, parseNumber, getDigit};
