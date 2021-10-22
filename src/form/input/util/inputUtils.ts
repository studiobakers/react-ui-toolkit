import {isMobileDevice} from "../../../core/utils/device/deviceUtils";
import {InputLocalizationOptions} from "./inputTypes";

function getLocalizationOptions(
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

export {getLocalizationOptions};
