import {useEffect, useRef, useState, useLayoutEffect} from "react";

import {SECOND_IN_MS} from "../time/timeConstants";
import {RemainingTimeBreakdown} from "../time/timeTypes";
import {calculateRemainingTimeBreakdown} from "../time/timeUtils";
import {DateTimerProps, TimerType} from "../../../date-timer/util/dateTimerTypes";

/**
 * A React Hook that provides a date timer
 * @param {Date[]} options.range - The target date range we're counting down to
 * @param {number} options.cadence - The rate of the timer in milliseconds
 * @param {TimerType} options.timerType - Type of the timer, either "down" or "up"
 * @param {onEnd} options.onEnd - If provided, runs this callback when the timer ended
 * @returns {object} The RemainingTimeBreakdown object
 */
function useDateTimer({
  range,
  cadence = SECOND_IN_MS,
  timerType = "down",
  onEnd
}: {
  range: DateTimerProps["range"];
  cadence?: number;
  timerType?: TimerType;
  onEnd?: DateTimerProps["onEnd"];
}): RemainingTimeBreakdown {
  const counterForIntervalRef = useRef(0);
  const interval = useRef<NodeJS.Timeout>();
  const [dateTimer, setDateTimer] = useState<RemainingTimeBreakdown>(
    calculateRemainingTimeBreakdown(range, counterForIntervalRef.current, timerType)
  );
  const [rangeStart, rangeEnd] = range;

  const savedOnEndCallback = useRef<typeof onEnd>();

  useLayoutEffect(() => {
    savedOnEndCallback.current = onEnd;
  }, [onEnd]);

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      if (rangeEnd) {
        counterForIntervalRef.current += cadence;
      }

      const data = calculateRemainingTimeBreakdown(
        [rangeStart, rangeEnd],
        counterForIntervalRef.current,
        timerType
      );

      if (data.delta >= SECOND_IN_MS) {
        setDateTimer(data);
      } else {
        clearInterval(interval.current!);
        setDateTimer({
          delta: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    }, cadence);

    return () => {
      clearInterval(interval.current!);
    };
  }, [cadence, rangeStart, rangeEnd, timerType]);

  useEffect(() => {
    if (dateTimer.delta <= 0) {
      clearInterval(interval.current!);

      if (savedOnEndCallback.current) {
        savedOnEndCallback.current();
      }
    }
  }, [dateTimer.delta]);

  return dateTimer;
}

export default useDateTimer;
