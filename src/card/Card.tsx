import "./_card.scss";

import React from "react";
import classNames from "classnames";

import Header from "./header/Header";
import Body from "./body/Body";

export interface CardProps {
  children: React.ReactNode;
  customClassName?: string;
}

function Card({children, customClassName}: CardProps) {
  return <div className={classNames("card", customClassName)}>{children}</div>;
}

Card.Header = Header;
Card.Body = Body;

export default Card;
