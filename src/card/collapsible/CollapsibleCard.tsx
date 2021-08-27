import "./_collapsible-card.scss";

import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames";

import Card from "../Card";

export interface CollapsibleCardProps {
  header: React.ReactNode;
  isOpen: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

function CollapsibleCard({header, isOpen, children, onClick}: CollapsibleCardProps) {
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isOpen ? childrenRef.current?.getBoundingClientRect().height : 0);
    let resizeObserver: ResizeObserver;

    if (isOpen && childrenRef.current) {
      resizeObserver = new ResizeObserver(() => {
        setHeight(childrenRef.current?.getBoundingClientRect().height);
      });

      resizeObserver.observe(childrenRef.current);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isOpen]);

  return (
    <Card>
      <Card.Header onClick={handleClick}>{header}</Card.Header>

      <div
        aria-expanded={isOpen}
        className={classNames("card__content", {"card__content--is-collapsed": !isOpen})}
        style={{height}}>
        <div ref={childrenRef}>{children}</div>
      </div>
    </Card>
  );

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
}

export default CollapsibleCard;
