import {DATE_FORMAT} from "../../../core/utils/time/timeConstants";
import {formatDateWithOptions} from "../../../core/utils/time/timeUtils";

function getTimeInputValue(
  value: {controlled: string; uncontrolled: string},
  initialDateTime: Date | null | undefined
) {
  const isControlledValueDefined = typeof value.controlled !== "undefined";
  let finalValue = value.uncontrolled;

  if (isControlledValueDefined && value.controlled === null && initialDateTime) {
    finalValue = formatDateWithOptions({
      format: DATE_FORMAT.LONG_TIME_FORMAT,
      shouldShiftDateToCompensateForTimezone: false
    })(initialDateTime);
  } else if (isControlledValueDefined) {
    finalValue = value.controlled;
  }

  return finalValue;
}

export {getTimeInputValue};
