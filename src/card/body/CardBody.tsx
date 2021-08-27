import "./_card-body.scss";

import React from "react";
import classNames from "classnames";

export interface CardBodyProps {
  children: React.ReactNode;
  customClassName?: string;
}

function CardBody({children, customClassName}: CardBodyProps) {
  return <div className={classNames("card-body", customClassName)}>{children}</div>;
}

export default CardBody;
