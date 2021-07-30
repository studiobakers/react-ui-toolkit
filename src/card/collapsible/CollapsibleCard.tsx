import "./_collapsible-card.scss";

import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames";

import Card from "../Card";

export interface CollapsibleCardProps {
  header: React.ReactNode;
  initialIsOpen?: boolean;
  children?: React.ReactNode;
  onChange?: (state: "open" | "close") => void;
}

function CollapsibleCard({
  header,
  initialIsOpen = false,
  children,
  onChange
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [height, setHeight] = useState<number | undefined>(initialIsOpen ? undefined : 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isOpen ? ref.current?.getBoundingClientRect().height : 0);
  }, [isOpen]);

  return (
    <Card>
      <Card.Header onClick={handleClick}>{header}</Card.Header>
      <div
        aria-expanded={isOpen}
        className={classNames("card__content", {"card__content--is-collapsed": !isOpen})}
        style={{height}}>
        <div ref={ref}>{children}</div>
      </div>
    </Card>
  );

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (onChange) {
      onChange(isOpen ? "close" : "open");
    }
    setIsOpen(!isOpen);
  }
}

export default CollapsibleCard;
