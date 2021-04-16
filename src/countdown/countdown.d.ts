declare namespace Countdown {
  interface CountdownProps {
    startDate: Date;
    testid?: string;
    countDownIntervalInSeconds?: number;
    alwaysShowSeconds?: boolean;
    onEnd?: () => void;
    customClassName?: string;
  }

  interface CountdownItem {
    id: "days" | "hours" | "minutes" | "seconds";
    count: string | number;
  }
}
