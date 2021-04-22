import parse from "date-fns/parse";
import addMinutes from "date-fns/addMinutes";
import formatDate from "date-fns/format";
import startOfToday from "date-fns/startOfToday";
import startOfDay from "date-fns/startOfDay";

import {truncateDecimalPart} from "../../../core/utils/number/numberUtils";
import {
  DATE_FORMAT,
  DAY_IN_S,
  MINUTE_IN_S,
  HOUR_IN_MINS
} from "../../../core/utils/time/timeConstants";
import {TimeInputDropdownOption} from "../TimeInput";
import {
  TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL,
  TIME_INPUT_DROPDOWN_OPTIONS_FIRST_HOUR_INTERVAL
} from "./timeInputConstants";
import {formatTimeStringTo12hFormatWithMeridiem} from "../../../core/utils/time/timeUtils";

function generateTimeInputDropdownOptionFromStartTimeDate(
  startTimeDate: Date,
  differenceInMinutes: number
): TimeInputDropdownOption {
  const date = addMinutes(startTimeDate, differenceInMinutes);
  const timeString = formatDate(date, DATE_FORMAT.LONG_TIME_FORMAT);

  return {
    id: timeString,
    title: timeString,
    subtitle: generateTimeInputDropdownOptionSubtitle(differenceInMinutes),
    context: {
      date,
      differenceInMinutes
    }
  };
}

function generateTimeInputDropdownDates(
  startTimeDate: Date,
  {
    arrayLength,
    interval = TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL,
    startTimeOffsetInMins = 0
  }: {arrayLength: number; interval?: number; startTimeOffsetInMins?: number}
) {
  return new Array(arrayLength)
    .fill(0)
    .map<TimeInputDropdownOption>((_item, index) =>
      generateTimeInputDropdownOptionFromStartTimeDate(
        startTimeDate,
        startTimeOffsetInMins + index * interval
      )
    );
}

function generateTimeInputDropdownOptions(options?: {
  startDate?: Date | null;
  startTime?: string;
}): TimeInputDropdownOption[] {
  let dropdownOptions: TimeInputDropdownOption[] = [];
  const {startDate, startTime} = options || {};

  if (startTime) {
    const startTimeDate = parse(
      formatTimeStringTo12hFormatWithMeridiem(startTime),
      DATE_FORMAT.LONG_TIME_FORMAT,
      startDate || new Date()
    );

    // First four options are separated by only 15 mins
    const firstHourOptions = generateTimeInputDropdownDates(startTimeDate, {
      arrayLength: 4,
      interval: TIME_INPUT_DROPDOWN_OPTIONS_FIRST_HOUR_INTERVAL
    })
      // Remove the first item as difference would be 0 mins from the startTimeDate
      .slice(1);

    // Remaining options are separated by 30 mins
    const remainingOptions = generateTimeInputDropdownDates(startTimeDate, {
      arrayLength:
        DAY_IN_S / (MINUTE_IN_S * TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL) - 2,
      startTimeOffsetInMins: HOUR_IN_MINS
    });

    dropdownOptions = [...firstHourOptions, ...remainingOptions];
  } else if (startDate) {
    dropdownOptions = generateTimeInputDropdownDates(startOfDay(startDate), {
      arrayLength: DAY_IN_S / (MINUTE_IN_S * TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL)
    });
  } else {
    dropdownOptions = generateTimeInputDropdownDates(startOfToday(), {
      arrayLength: DAY_IN_S / (MINUTE_IN_S * TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL)
    });
  }

  return dropdownOptions.map((option) => ({
    ...option,
    subtitle: generateTimeInputDropdownOptionSubtitle(option.context!.differenceInMinutes)
  }));
}

function generateTimeInputDropdownOptionSubtitle(differenceInMinutes: number): string {
  return differenceInMinutes <= HOUR_IN_MINS
    ? `${differenceInMinutes} mins`
    : `${truncateDecimalPart(1)(differenceInMinutes / HOUR_IN_MINS)} hrs`;
}

export {generateTimeInputDropdownOptions};
