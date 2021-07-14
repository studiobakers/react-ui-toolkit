import "./_card.scss";

import React from "react";
import classNames from "classnames";

import CardHeader from "./header/CardHeader";
import CardBody from "./body/CardBody";

export interface CardProps {
  children: React.ReactNode;
  customClassName?: string;
}

function Card({children, customClassName}: CardProps) {
  return <div className={classNames("card", customClassName)}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
