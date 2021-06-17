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

  return (
    <div
      className={progressBarClassName}
      style={{
        backgroundColor
      }}
      data-testid={testid}>
      <div
        className={"progress-bar__track"}
        style={{
          // eslint-disable-next-line no-magic-numbers
          width: percentage >= 100 ? "100%" : `${percentage}%`,
          // eslint-disable-next-line no-magic-numbers
          backgroundColor: percentage >= 100 ? completedColor : trackColor
        }}
        data-testid={`${testid}.track`}
      />

      {children && <div className={"progress-bar__content"}>{children}</div>}
    </div>
  );
}

export default ProgressBar;
