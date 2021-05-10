export interface CountdownProps {
  startDate: Date;
  testid?: string;
  titleMap?: {
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
  };
  countDownIntervalInSeconds?: number;
  alwaysShowSeconds?: boolean;
  onEnd?: () => void;
  customClassName?: string;
}

export interface CountdownItem {
  id: "days" | "hours" | "minutes" | "seconds";
  title: string;
  count: string | number;
}
