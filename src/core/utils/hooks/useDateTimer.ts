import {useEffect, useRef, useState, useLayoutEffect} from "react";

import {SECOND_IN_MS} from "../time/timeConstants";
import {RemainingTimeBreakdown} from "../time/timeTypes";
import {calculateRemainingTimeBreakdown} from "../time/timeUtils";
import {TimerType} from "../../../date-timer/util/dateTimerTypes";

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
  range: Date[];
  cadence?: number;
  timerType?: TimerType;
  onEnd?: VoidFunction;
}): RemainingTimeBreakdown {
  const [counter, setCounter] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  const [dateTimer, setDateTimer] = useState<RemainingTimeBreakdown>(
    calculateRemainingTimeBreakdown(range, counter, timerType)
  );

  const savedOnEndCallback = useRef<typeof onEnd>();

  useLayoutEffect(() => {
    savedOnEndCallback.current = onEnd;
  }, [onEnd]);

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      if (range.length > 1) {
        setCounter(counter + cadence);
      }

      const data = calculateRemainingTimeBreakdown(range, counter, timerType);

      if (data.delta >= 0) {
        setDateTimer(data);
      } else {
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
  }, [cadence, range, counter, timerType]);

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
