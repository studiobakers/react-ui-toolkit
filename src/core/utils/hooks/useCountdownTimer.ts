import {useEffect, useRef, useState, useLayoutEffect} from "react";

import {MINUTE_IN_S, SECOND_IN_MS} from "../time/timeConstants";
import {CountDownResults} from "../time/timeTypes";
import {calculateRemainingTime} from "../time/timeUtils";

/**
 * A React Hook that provides a countdown time
 * @param {Date} target the target date we're counting down to
 * @param {number} cadence the rate of the timer in seconds
 *
 * @returns {object} the CountDownResults object with ref
 */
function useCountDownTimer(target: Date, cadence = MINUTE_IN_S): CountDownResults {
  const interval = useRef<NodeJS.Timeout>();
  const [countdown, setCountDown] = useState<CountDownResults>(
    calculateRemainingTime(target)
  );

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      if (countdown.delta >= 0) {
        setCountDown(calculateRemainingTime(target));
      }
    }, cadence * SECOND_IN_MS);

    return () => {
      clearInterval(interval.current!);
    };
  }, [cadence, countdown.delta, target]);

  useEffect(() => {
    if (countdown.delta <= 0) {
      clearInterval(interval.current!);
    }
  }, [countdown.delta]);

  return countdown;
}

export default useCountDownTimer;
