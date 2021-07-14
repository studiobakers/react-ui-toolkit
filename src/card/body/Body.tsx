import "./_body.scss";

import React from "react";
import classNames from "classnames";

export interface BodyProps {
  children: React.ReactNode;
  customClassName?: string;
}

function Body({children, customClassName}: BodyProps) {
  return <div className={classNames("card__body", customClassName)}>{children}</div>;
}

export default Body;
