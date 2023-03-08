/// <reference types="react" />
import "./_date-timer.scss";
import { DateTimerProps } from "./util/dateTimerTypes";
declare function DateTimer({ testid, range, timerInterval, timerType, alwaysShowSeconds, titleMap, onEnd, customClassName }: DateTimerProps): JSX.Element;
export default DateTimer;
