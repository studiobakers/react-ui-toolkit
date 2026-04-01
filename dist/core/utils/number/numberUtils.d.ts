import { FormatNumberOptions, ParseNumberOptions } from "./numberTypes";
/**
 * @param {number} limit The number of digits in decimal part of a number
 * @return {function} A function that takes in a number and returns the truncated version of it
 */
declare function truncateDecimalPart(limit: number): (x: number) => number;
/**
 * @param {number} x number to check
 * @return {boolean} Whether x is an integer or not
 */
declare function isInteger(x: number): boolean;
declare function isIntlAPISupported(): boolean;
declare function formatNumber(formatNumberOptions: FormatNumberOptions): (value: number) => string;
/**
 * Coerces a number to scientific notation. {@link https://observablehq.com/@mbostock/localized-number-parsing | Reference}
 * @param {object} options - An object includes parse number options
 * @param {string} options.locale - Default locale used is browser locale
 * @param {number} options.maximumFractionDigits - The maximum digit a decimal can have
 * @param {number} value - A number to convert to string
 * @returns {string} The value after coercing the given value to a scientific notation.
 */
declare function parseNumber(options: ParseNumberOptions, value: string): string;
declare function getDigit(digitMap: Map<string, number>): (d: string) => string;
declare function mapDigitsToLocalVersion({ locale }: {
    locale?: string;
}, digits: string): string;
declare function getNumberSeparators(locale?: string): {
    THOUSANDTHS_SEPARATOR: string;
    DECIMAL_NUMBER_SEPARATOR: string;
    MINUS_SIGN: string;
};
/**
 * @returns Scientific and locale presentations of "-0" and "-00" values
 */
declare function getNegativeZero(locale?: string): {
    LOCALE_NEGATIVE_ZERO: string;
    LOCALE_NEGATIVE_DOUBLE_ZERO: string;
    DEFAULT_NEGATIVE_ZERO: string;
    DEFAULT_NEGATIVE_DOUBLE_ZERO: string;
};
declare function removeLeadingZeros(locale: string | undefined, value: string): string;
declare function getThousandthSeparatorCount(value: string): number;
declare function isNonNegativeNumber(x: unknown): x is number;
export { truncateDecimalPart, isInteger, isIntlAPISupported, formatNumber, parseNumber, getDigit, getNumberSeparators, getNegativeZero, mapDigitsToLocalVersion, removeLeadingZeros, getThousandthSeparatorCount, isNonNegativeNumber };
