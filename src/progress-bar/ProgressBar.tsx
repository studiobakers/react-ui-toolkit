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
  children: {
    content?: React.ReactNode;
    position?: "top" | "bottom" | "inside";
  };
  view?: "line" | "bar";
  customClassName?: string;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    percentage,
    style: {trackColor = "blue", backgroundColor = "gray", completedColor = "green"},
    children: {content, position = "top"},
    view = "bar",
    customClassName
  } = props;
  const progressBarContainerClassName = classNames(
    "progress-bar-container",
    customClassName
  );
  const progressBarClassName = classNames("progress-bar", {
    "progress-bar--is-line-view": view === "line",
    "progress-bar--is-bar-view": view === "bar"
  });

  return (
    <div className={progressBarContainerClassName}>
      {content && position !== "inside" && renderContent()}

      <div
        className={progressBarClassName}
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

        {content && position === "inside" && view === "bar" && renderContent()}
      </div>
    </div>
  );

  function renderContent() {
    return (
      <div
        className={classNames(
          "progress-bar__content",
          `progress-bar__content--is-position-${position}`
        )}>
        {content}
      </div>
    );
  }
}

export default ProgressBar;
