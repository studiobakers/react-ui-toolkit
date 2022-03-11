import "./_progress-bar.scss";

import React from "react";
import classNames from "classnames";

const MAX_VALUE = 100;

export interface ProgressBarProps {
  percentage: number;
  style?: {
    trackColor?: string;
    backgroundColor?: string;
    completedColor?: string;
  };
  ariaLabelledBy?: string;
  ariaLabel?: string;
  ariaValueText?: string;
  ariaDescribedBy?: string;
  title?: string;
  children?: React.ReactNode;
  customClassName?: string;
  testid?: string;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    ariaLabelledBy,
    ariaLabel,
    title,
    ariaValueText,
    ariaDescribedBy,
    testid
  } = props;
  const {percentage, style, children, customClassName} = props;
  const progressBarClassName = classNames("progress-bar", customClassName);
  const parsedPercentage = percentage >= MAX_VALUE ? MAX_VALUE : percentage;
  const {trackColor = "blue", backgroundColor = "gray", completedColor = "green"} =
    style || {};

  return (
    <div
      className={progressBarClassName}
      style={{
        backgroundColor
      }}
      role={"progressbar"}
      aria-valuenow={parsedPercentage}
      aria-valuemin={0}
      aria-valuemax={MAX_VALUE}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      title={title}
      aria-valuetext={ariaValueText}
      aria-describedby={ariaDescribedBy}
      data-testid={testid}>
      <div
        className={"progress-bar__track"}
        style={{
          width: `${parsedPercentage}%`,
          backgroundColor: parsedPercentage === MAX_VALUE ? completedColor : trackColor
        }}
        data-testid={`${testid}.track`}
      />

      {children && <div className={"progress-bar__content"}>{children}</div>}
    </div>
  );
}

export default ProgressBar;
