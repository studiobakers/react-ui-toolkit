import "./_card-header.scss";

import React from "react";
import classNames from "classnames";

export interface CardHeaderProps {
  children?: React.ReactNode;
  customClassName?: string;
  onClick?: (event?: React.MouseEvent) => void;
}

function CardHeader({children, customClassName, onClick}: CardHeaderProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "Enter":
      case "Space":
        if (onClick) {
          onClick();
        }
        break;
      default:
    }
  }
  if (onClick) {
    return (
      <div
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={"button"}
        tabIndex={0}
        className={classNames("card__header card__header--clickable", customClassName)}>
        {children}
      </div>
    );
  }

  return <div className={classNames("card__header", customClassName)}>{children}</div>;
}

export default CardHeader;
