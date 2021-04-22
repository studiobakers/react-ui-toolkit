interface RemainingTimeBreakdown {
  delta: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type FormatDateUtilOptions = {
  timeZone?: string | null;
  format?: string;
  shouldShiftDateToCompensateForTimezone?: boolean;
  isProvidedDateInUTC?: boolean;
};

export {RemainingTimeBreakdown, FormatDateUtilOptions};
