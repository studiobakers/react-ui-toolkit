import parse from "date-fns/parse";
import addMinutes from "date-fns/addMinutes";
import formatDate from "date-fns/format";
import startOfToday from "date-fns/startOfToday";

import {truncateDecimalPart} from "../../../../core/utils/number/numberUtils";
import {
  DATE_FORMAT,
  DAY_IN_S,
  MINUTE_IN_S,
  HOUR_IN_MINS
} from "../../../../core/utils/time/timeConstants";
import {formatTimeStringTo12hFormatWithMeridiem} from "../../../../core/utils/time/timeUtils";
import {TIME_DROPDOWN_OPTION_INTERVALS} from "./timeDropdownConstants";
import {TimeDropdownOption} from "../TimeDropdown";

function generateTimeDropdownOptionFromStartTimeDate(
  startTimeDate: Date,
  differenceInMinutes: number
): TimeDropdownOption {
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

function generateTimeDropdownOptionsFromStartTimeDate(
  startTimeDate: Date,
  {
    arrayLength,
    interval = TIME_DROPDOWN_OPTION_INTERVALS.DEFAULT,
    startTimeOffsetInMins = 0
  }: {arrayLength: number; interval?: number; startTimeOffsetInMins?: number}
) {
  return new Array(arrayLength)
    .fill(0)
    .map<TimeDropdownOption>((_item, index) =>
      generateTimeDropdownOptionFromStartTimeDate(
        startTimeDate,
        startTimeOffsetInMins + index * interval
      )
    );
}

function generateTimeDropdownOptions(options?: {
  startDate?: Date | null;
  startTime?: string;
}): TimeDropdownOption[] {
  let dropdownOptions: TimeDropdownOption[] = [];
  const {startDate, startTime} = options || {};

  if (startTime) {
    const startTimeDate = parse(
      formatTimeStringTo12hFormatWithMeridiem(startTime),
      DATE_FORMAT.LONG_TIME_FORMAT,
      startDate || new Date()
    );

    // First four options are separated by only 15 mins
    const firstHourOptions = generateTimeDropdownOptionsFromStartTimeDate(startTimeDate, {
      // eslint-disable-next-line no-magic-numbers
      arrayLength: Math.floor(HOUR_IN_MINS / TIME_DROPDOWN_OPTION_INTERVALS.FIRST_HOUR),
      interval: TIME_DROPDOWN_OPTION_INTERVALS.FIRST_HOUR
    })
      // Remove the first item as difference would be 0 mins from the startTimeDate
      .slice(1);

    // Remaining options are separated by 30 mins
    const remainingOptions = generateTimeDropdownOptionsFromStartTimeDate(startTimeDate, {
      arrayLength:
        // eslint-disable-next-line no-magic-numbers
        DAY_IN_S / (MINUTE_IN_S * TIME_DROPDOWN_OPTION_INTERVALS.DEFAULT) - 2,
      startTimeOffsetInMins: HOUR_IN_MINS
    });

    dropdownOptions = [...firstHourOptions, ...remainingOptions];
  } else if (startDate) {
    dropdownOptions = generateTimeDropdownOptionsFromStartTimeDate(startDate, {
      arrayLength: DAY_IN_S / (MINUTE_IN_S * TIME_DROPDOWN_OPTION_INTERVALS.DEFAULT)
    });
  } else {
    dropdownOptions = generateTimeDropdownOptionsFromStartTimeDate(startOfToday(), {
      arrayLength: DAY_IN_S / (MINUTE_IN_S * TIME_DROPDOWN_OPTION_INTERVALS.DEFAULT)
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
