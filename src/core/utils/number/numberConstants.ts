const IS_LAST_CHARACTER_DECIMAL_POINT_REGEX = /\.$/;
const MATCH_ZEROS_AFTER_DECIMAL_REGEX = /\.0+$/;
const NOT_INTEGER_FIRST_CHARACTER_OF_STRING_REGEX = /^[^0-9]/g;
const NOT_NUMBER_NOR_DECIMAL_POINT_REGEX = /[^0-9.]/g;
const PRECISION_REGEX = /(\..*)\./g;

const LOCALE = navigator.language;
// eslint-disable-next-line no-magic-numbers
const exampleNumber = new Intl.NumberFormat(LOCALE).formatToParts(1234.5);

const DECIMAL_NUMBER_SEPARATOR = exampleNumber.find((group) => group.type === "decimal")!
  .value;
const THOUSANDTHS_SEPARATOR = exampleNumber.find((group) => group.type === "group")!
  .value;

export {
  IS_LAST_CHARACTER_DECIMAL_POINT_REGEX,
  MATCH_ZEROS_AFTER_DECIMAL_REGEX,
  NOT_INTEGER_FIRST_CHARACTER_OF_STRING_REGEX,
  NOT_NUMBER_NOR_DECIMAL_POINT_REGEX,
  PRECISION_REGEX,
  DECIMAL_NUMBER_SEPARATOR,
  THOUSANDTHS_SEPARATOR
};
