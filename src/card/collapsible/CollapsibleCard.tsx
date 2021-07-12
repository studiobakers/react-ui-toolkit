import "./_collapsibleCard.scss";

import React, {useState} from "react";
import classNames from "classnames";

import Card from "../Card";

export interface CollapsibleCardProps {
  header: React.ReactNode;
  initialIsOpen?: boolean;
  children?: React.ReactNode;
  onChange?: (state: "opening" | "closing") => void;
}

function CollapsibleCard({
  header,
  initialIsOpen = false,
  children,
  onChange
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (onChange) {
      onChange(isOpen ? "closing" : "opening");
    }
    setIsOpen(!isOpen);
  }

  return (
    <Card>
      <Card.Header onClick={handleClick}>{header}</Card.Header>
      <div
        className={classNames(
          "card__content",
          `${isOpen ? "card__content--expanded" : "card__content--collapsed"}`
        )}>
        {children}
      </div>
    </Card>
  );
}

export default CollapsibleCard;
