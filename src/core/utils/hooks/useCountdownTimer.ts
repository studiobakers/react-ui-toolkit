import {useEffect, useRef, useState, useLayoutEffect} from "react";

import {MINUTE_IN_MS} from "../time/timeConstants";
import {CountdownResults} from "../time/timeTypes";
import {calculateRemainingTime} from "../time/timeUtils";

/**
 * A React Hook that provides a countdown time
 * @param {Date} target the target date we're counting down to
 * @param {number} cadence the rate of the timer in milliseconds
 *
 * @returns {object} the CountDownResults object with ref
 */
function useCountDownTimer(target: Date, cadence = MINUTE_IN_MS): CountdownResults {
  const interval = useRef<NodeJS.Timeout>();
  const [countdown, setCountDown] = useState<CountdownResults>(
    calculateRemainingTime(target)
  );

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      const data = calculateRemainingTime(target);

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
