import {RemainingTimeBreakdown} from "../../core/utils/time/timeTypes";

export type TimerType = "down" | "up";

export interface DateTimerProps {
  range: Date[];
  testid?: string;
  titleMap?: {
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
  };

  timerInterval?: number /* in seconds */;
  timerType?: TimerType;

  alwaysShowSeconds?: boolean;
  onEnd?: () => void;
  customClassName?: string;
}

export type DateTimerItemID = keyof Omit<RemainingTimeBreakdown, "delta">;

export interface DateTimerItem {
  id: DateTimerItemID;
  title: string;
  count: string | number;
}
