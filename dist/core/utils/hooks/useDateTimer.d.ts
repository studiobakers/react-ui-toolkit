import { RemainingTimeBreakdown } from "../time/timeTypes";
import { DateTimerProps, TimerType } from "../../../date-timer/util/dateTimerTypes";
/**
 * A React Hook that provides a date timer
 * @param {Date[]} options.range - The target date range we're counting down to
 * @param {number} options.cadence - The rate of the timer in milliseconds
 * @param {TimerType} options.timerType - Type of the timer, either "down" or "up"
 * @param {onEnd} options.onEnd - If provided, runs this callback when the timer ended
 * @returns {object} The RemainingTimeBreakdown object
 */
declare function useDateTimer({ range, cadence, timerType, onEnd }: {
    range: DateTimerProps["range"];
    cadence?: number;
    timerType?: TimerType;
    onEnd?: DateTimerProps["onEnd"];
}): RemainingTimeBreakdown;
export default useDateTimer;
