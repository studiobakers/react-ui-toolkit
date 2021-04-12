import "./_progress-bar.scss";

import React from "react";
import classNames from "classnames";

interface ProgressBarProps {
  percentage: number;
  style: {
    trackColor?: string;
    backgroundColor?: string;
    completedColor?: string;
  };
  children: {
    content?: React.ReactNode;
    position?: "top" | "bottom" | "in";
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
      {content && position !== "in" && (
        <div
          className={classNames(
            "progress-bar__content",
            `progress-bar__content--is-position-${position}`
          )}>
          {content}
        </div>
      )}
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

        {content && position === "in" && view === "bar" && (
          <div className={"progress-bar__content progress-bar__content--is-position-in"}>
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
