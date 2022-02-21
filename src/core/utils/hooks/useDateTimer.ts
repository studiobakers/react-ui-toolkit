import {useEffect, useRef, useState, useLayoutEffect} from "react";

import {SECOND_IN_MS} from "../time/timeConstants";
import {RemainingTimeBreakdown} from "../time/timeTypes";
import {calculateRemainingTimeBreakdown} from "../time/timeUtils";
import {TimerType} from "../../../date-timer/util/dateTimerTypes";

/**
 * A React Hook that provides a date timer
 * @param {Date[]} range - The target date range we're counting down to
 * @param {number} cadence - The rate of the timer in milliseconds
 * @param {TimerType} timerType - Type of the timer, either "down" or "up"
 * @returns {object} The RemainingTimeBreakdown object
 */
function useDateTimer(
  range: Date[],
  cadence = SECOND_IN_MS,
  timerType = "down" as TimerType
): RemainingTimeBreakdown {
  const cadenceInMs = cadence * SECOND_IN_MS;
  const [counter, setCounter] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  const [dateTimer, setDateTimer] = useState<RemainingTimeBreakdown>(
    calculateRemainingTimeBreakdown(range, counter, timerType)
  );

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
    }, cadenceInMs);

    return () => {
      clearInterval(interval.current!);
    };
  }, [cadence, cadenceInMs, range, counter, timerType]);

  useEffect(() => {
    if (dateTimer.delta <= 0) {
      clearInterval(interval.current!);
    }
  }, [dateTimer.delta]);

  return dateTimer;
}

export default useDateTimer;
