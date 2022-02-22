import {RemainingTimeBreakdown} from "../../core/utils/time/timeTypes";

export type TimerType = "down" | "up";

export type DateTimerItemID = keyof Omit<RemainingTimeBreakdown, "delta">;

export interface DateTimerProps {
  range: [Date, Date?];
  testid?: string;
  titleMap?: Record<DateTimerItemID, undefined | string>;

  timerInterval?: number /* in seconds */;
  timerType?: TimerType;

  alwaysShowSeconds?: boolean;
  onEnd?: () => void;
  customClassName?: string;
}

export interface DateTimerItem {
  id: DateTimerItemID;
  title: string;
  count: string | number;
}
