import {useEffect, useRef, useState, useLayoutEffect} from "react";

import {SECOND_IN_MS} from "../time/timeConstants";
import {RemainingTimeBreakdown} from "../time/timeTypes";
import {calculateRemainingTimeBreakdown} from "../time/timeUtils";

/**
 * A React Hook that provides a countdown time
 * @param {Date} target - The target date we're counting down to
 * @param {number} cadence - The rate of the timer in milliseconds
 * @returns {object} The CountDownResults object
 */
function useCountDownTimer(target: Date, cadence = SECOND_IN_MS): RemainingTimeBreakdown {
  const interval = useRef<NodeJS.Timeout>();
  const [countdown, setCountDown] = useState<RemainingTimeBreakdown>(
    calculateRemainingTimeBreakdown(target)
  );

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      const data = calculateRemainingTimeBreakdown(target);

      if (data.delta >= 0) {
        setCountDown(data);
      } else {
        setCountDown({
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
  }, [cadence, target]);

  useEffect(() => {
    if (countdown.delta <= 0) {
      clearInterval(interval.current!);
    }
  }, [countdown.delta]);

  return countdown;
}

export default useCountDownTimer;
