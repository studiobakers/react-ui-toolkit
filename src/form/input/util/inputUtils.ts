import {isMobileDevice} from "../../../core/utils/device/deviceUtils";
import {ParseNumberOptions} from "../../../core/utils/number/numberTypes";
import {InputLocalizationOptions} from "./inputTypes";

function getInputLocalizationOptions(
  localizationOptions: InputLocalizationOptions
): InputLocalizationOptions {
  return isMobileDevice()
    ? {
        shouldFormatToLocaleString: false,
        locale: undefined,
        maximumFractionDigits: localizationOptions.maximumFractionDigits
      }
    : localizationOptions;
}

function getInputParseNumberOptions(options: ParseNumberOptions): ParseNumberOptions {
  return isMobileDevice()
    ? {
        ...options,
        locale: "en-US"
      }
    : options;
}

export {getInputLocalizationOptions, getInputParseNumberOptions};
