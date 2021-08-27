import "./_collapsible-card.scss";

import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames";

import Card from "../Card";

export interface CollapsibleCardProps {
  header: React.ReactNode;
  isOpen?: boolean;
  initialIsOpen?: boolean;
  children: React.ReactNode;
  onToggle?: () => void;
}

function CollapsibleCard({
  header,
  isOpen: isOpenFromProps,
  initialIsOpen = false,
  children,
  onToggle
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [height, setHeight] = useState<number | undefined>(
    isOpenFromProps || isOpen ? undefined : 0
  );
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(
      isOpenFromProps || isOpen ? childrenRef.current?.getBoundingClientRect().height : 0
    );
    let resizeObserver: ResizeObserver;

    if ((isOpenFromProps || isOpen) && childrenRef.current) {
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
  }, [isOpen, isOpenFromProps]);

  return (
    <Card>
      <Card.Header onClick={handleClick}>{header}</Card.Header>

      <div
        aria-expanded={isOpenFromProps || isOpen}
        className={classNames("card-content", {
          "card-content--is-collapsed": !(isOpenFromProps || isOpen)
        })}
        style={{height}}>
        <div ref={childrenRef}>{children}</div>
      </div>
    </Card>
  );

  function handleClick() {
    if (isOpenFromProps === undefined) {
      setIsOpen(!isOpen);
    }
    if (onToggle) {
      onToggle();
    }
  }
}

export default CollapsibleCard;
