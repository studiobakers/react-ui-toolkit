import "./_progress-bar.scss";

import React from "react";
import classNames from "classnames";

export interface ProgressBarProps {
  percentage: number;
  style: {
    trackColor?: string;
    backgroundColor?: string;
    completedColor?: string;
  };
  children?: React.ReactNode;
  customClassName?: string;
  testid?: string;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    percentage,
    style: {trackColor = "blue", backgroundColor = "gray", completedColor = "green"},
    children,
    customClassName,
    testid
  } = props;
  const progressBarClassName = classNames("progress-bar", customClassName);
  // eslint-disable-next-line no-magic-numbers
  const parsedPercentage = percentage >= 100 ? 100 : percentage;

  return (
    <div
      className={progressBarClassName}
      style={{
        backgroundColor
      }}
      role={"progressbar"}
      aria-valuenow={parsedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid={testid}>
      <div
        className={"progress-bar__track"}
        style={{
          width: `${parsedPercentage}%`,
          // eslint-disable-next-line no-magic-numbers
          backgroundColor: parsedPercentage === 100 ? completedColor : trackColor
        }}
        data-testid={`${testid}.track`}
      />

      {children && <div className={"progress-bar__content"}>{children}</div>}
    </div>
  );
}

export default ProgressBar;
