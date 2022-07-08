import {isMobileDevice} from "../../../../core/utils/device/deviceUtils";
import {ParseNumberOptions} from "../../../../core/utils/number/numberTypes";
import {
  getNegativeZero,
  getNumberSeparators
} from "../../../../core/utils/number/numberUtils";
import {NumberInputFormatProps} from "./numberInputTypes";

function getNumberInputFormatProps(formatProps: NumberInputFormatProps) {
  return isMobileDevice() && typeof new Intl.NumberFormat() !== "undefined"
    ? {
        locale: undefined,
        shouldFormatToLocaleString: false,
        DECIMAL_NUMBER_SEPARATOR: undefined,
        MINUS_SIGN: undefined,
        LOCALE_NEGATIVE_ZERO: undefined
      }
    : {
        ...formatProps,
        ...getNumberSeparators(formatProps.locale),
        ...getNegativeZero(formatProps.locale)
      };
}

function getNumberInputParseNumberOptions(
  options: ParseNumberOptions
): ParseNumberOptions {
  return isMobileDevice()
    ? {
        ...options,
        locale: "en-US"
      }
    : options;
}

export {getNumberInputFormatProps, getNumberInputParseNumberOptions};
