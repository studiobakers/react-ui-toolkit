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
  const progressBarContainerClassName = classNames(
    "progress-bar-container",
    customClassName
  );

  return (
    <div className={progressBarContainerClassName}>
      <div
        className={"progress-bar"}
        style={{
          backgroundColor: backgroundColor
        }}>
        <div
          className={"progress-bar__track"}
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? completedColor : trackColor
          }}
        />

        {children && <div className={"progress-bar__content"}>{children}</div>}
      </div>
    </div>
  );
}

export default ProgressBar;
