import "./_spinner.scss";

import React from "react";
import classNames from "classnames";

export interface SpinnerProps {
  color?: string;
  customClassName?: string;
}

function Spinner({color = "#150F2A", customClassName}: SpinnerProps) {
  const spinnerClassName = classNames("spinner", customClassName);

  return (
    <svg
      width={"20"}
      height={"20"}
      viewBox={"0 0 20 20"}
      fill={"none"}
      className={spinnerClassName}
      xmlns={"http://www.w3.org/2000/svg"}>
      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={`M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10 17.4737C14.1276 17.4737 17.4737 14.1276 17.4737 10C17.4737 5.8724 14.1276 2.52632 10 2.52632C5.8724 2.52632 2.52632 5.8724 2.52632 10C2.52632 14.1276 5.8724 17.4737 10 17.4737Z`}
        fill={"url(#paint0_linear)"}
      />
      <defs>
        <linearGradient
          id={"paint0_linear"}
          x1={"20"}
          y1={"10.0351"}
          x2={"4.52632"}
          y2={"10.0351"}
          gradientUnits={"userSpaceOnUse"}>
          <stop stopColor={color} />
          <stop offset={"1"} stopColor={"white"} stopOpacity={"0"} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Spinner;
