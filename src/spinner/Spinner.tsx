import "./_spinner.scss";

import React from "react";
import classNames from "classnames";

export interface SpinnerProps {
  customClassName?: string;
  spinnerColor?: string;
  backgroundColor?: string;
}

function Spinner({customClassName, spinnerColor, backgroundColor}: SpinnerProps) {
  const spinnerClassName = classNames("spinner", customClassName);
  let spinnerStyle;
  let backgroundStyle;

  if (spinnerColor) {
    spinnerStyle = {
      background: `linear-gradient(to right, ${spinnerColor} 10%, rgba(255, 255, 255, 0) 42%)`
    };
  }

  if (backgroundColor) {
    backgroundStyle = {
      background: backgroundColor
    };
  }

  return (
    <div className={spinnerClassName} style={spinnerStyle}>
      <span className={"spinner-background"} style={backgroundStyle} />
    </div>
  );
}

export default Spinner;
