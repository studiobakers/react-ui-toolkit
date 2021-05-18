import parse from "date-fns/parse";
import addMinutes from "date-fns/addMinutes";
import formatDate from "date-fns/format";
import startOfToday from "date-fns/startOfToday";
import startOfDay from "date-fns/startOfDay";

import {truncateDecimalPart} from "../../../../core/utils/number/numberUtils";
import {
  DATE_FORMAT,
  DAY_IN_S,
  MINUTE_IN_S,
  HOUR_IN_MINS
} from "../../../../core/utils/time/timeConstants";
import {formatTimeStringTo12hFormatWithMeridiem} from "../../../../core/utils/time/timeUtils";
import {TimeSelectDropdownOption} from "../../select/TimeSelect";
import {
  TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL,
  TIME_INPUT_DROPDOWN_OPTIONS_FIRST_HOUR_INTERVAL
} from "./timeDropdownConstants";

function generateTimeDropdownOptionFromStartTimeDate(
  startTimeDate: Date,
  differenceInMinutes: number
): TimeSelectDropdownOption {
  const date = addMinutes(startTimeDate, differenceInMinutes);
  const timeString = formatDate(date, DATE_FORMAT.LONG_TIME_FORMAT);

  return {
    id: timeString,
    title: timeString,
    subtitle: generateTimeDropdownOptionSubtitle(differenceInMinutes),
    context: {
      date,
      differenceInMinutes
    }
  };
}

function generateTimeDropdownDates(
  startTimeDate: Date,
  {
    arrayLength,
    interval = TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL,
    startTimeOffsetInMins = 0
  }: {arrayLength: number; interval?: number; startTimeOffsetInMins?: number}
) {
  return new Array(arrayLength)
    .fill(0)
    .map<TimeSelectDropdownOption>((_item, index) =>
      generateTimeDropdownOptionFromStartTimeDate(
        startTimeDate,
        startTimeOffsetInMins + index * interval
      )
    );
}

function generateTimeDropdownOptions(options?: {
  startDate?: Date | null;
  startTime?: string;
}): TimeSelectDropdownOption[] {
  let dropdownOptions: TimeSelectDropdownOption[] = [];
  const {startDate, startTime} = options || {};

  if (startTime) {
    const startTimeDate = parse(
      formatTimeStringTo12hFormatWithMeridiem(startTime),
      DATE_FORMAT.LONG_TIME_FORMAT,
      startDate || new Date()
    );

    // First four options are separated by only 15 mins
    const firstHourOptions = generateTimeDropdownDates(startTimeDate, {
      // eslint-disable-next-line no-magic-numbers
      arrayLength: 4,
      interval: TIME_INPUT_DROPDOWN_OPTIONS_FIRST_HOUR_INTERVAL
    })
      // Remove the first item as difference would be 0 mins from the startTimeDate
      .slice(1);

    // Remaining options are separated by 30 mins
    const remainingOptions = generateTimeDropdownDates(startTimeDate, {
      arrayLength:
        // eslint-disable-next-line no-magic-numbers
        DAY_IN_S / (MINUTE_IN_S * TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL) - 2,
      startTimeOffsetInMins: HOUR_IN_MINS
    });

    dropdownOptions = [...firstHourOptions, ...remainingOptions];
  } else if (startDate) {
    dropdownOptions = generateTimeDropdownDates(startOfDay(startDate), {
      arrayLength: DAY_IN_S / (MINUTE_IN_S * TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL)
    });
  } else {
    dropdownOptions = generateTimeDropdownDates(startOfToday(), {
      arrayLength: DAY_IN_S / (MINUTE_IN_S * TIME_INPUT_DROPDOWN_OPTIONS_DEFAULT_INTERVAL)
    });
  }

  return dropdownOptions.map((option) => ({
    ...option,
    subtitle: generateTimeDropdownOptionSubtitle(option.context!.differenceInMinutes)
  }));
}

function generateTimeDropdownOptionSubtitle(differenceInMinutes: number): string {
  return differenceInMinutes <= HOUR_IN_MINS
    ? `${differenceInMinutes} mins`
    : `${truncateDecimalPart(1)(differenceInMinutes / HOUR_IN_MINS)} hrs`;
}

export {generateTimeDropdownOptions};
