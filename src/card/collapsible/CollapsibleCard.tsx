import "./_collapsibleCard.scss";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [height, setHeight] = useState<number | undefined>(initialIsOpen ? undefined : 0);
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (onChange) {
      onChange(isOpen ? "close" : "open");
    }
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setHeight(isOpen ? ref.current?.getBoundingClientRect().height : 0);
    setIsAnimating(true);

    const animationTime = 500;
    const timeoutID = window.setTimeout(() => {
      setIsAnimating(false);
    }, animationTime);

    return () => window.clearTimeout(timeoutID);
  }, [isOpen]);
  return (
    <Card>
      <Card.Header onClick={handleClick}>{header}</Card.Header>
      <div
        aria-expanded={isOpen}
        className={classNames(
          "card__content",
          !isAnimating && !isOpen ? "card__content--collapsed" : ""
        )}
        style={{height}}>
        <div ref={ref}>{children}</div>
      </div>
    </Card>
  );
}

export default CollapsibleCard;
