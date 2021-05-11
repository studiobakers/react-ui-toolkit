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
}

function ProgressBar(props: ProgressBarProps) {
  const {
    percentage,
    style: {trackColor = "blue", backgroundColor = "gray", completedColor = "green"},
    children,
    customClassName
  } = props;
  const progressBarClassName = classNames("progress-bar", customClassName);

  return (
    <div
      className={progressBarClassName}
      style={{
        backgroundColor
      }}>
      <div
        className={"progress-bar__track"}
        style={{
          width: `${percentage}%`,
          // eslint-disable-next-line no-magic-numbers
          backgroundColor: percentage === 100 ? completedColor : trackColor
        }}
      />

      {children && <div className={"progress-bar__content"}>{children}</div>}
    </div>
  );
}

export default ProgressBar;
