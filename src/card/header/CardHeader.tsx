import "./_card-header.scss";

import React from "react";
import classNames from "classnames";

import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";

export interface CardHeaderProps {
  children: React.ReactNode;
  customClassName?: string;
  onClick?: (event?: React.MouseEvent) => void;
}

function CardHeader({children, customClassName, onClick}: CardHeaderProps) {
  return onClick ? (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={"button"}
      tabIndex={0}
      className={classNames("card-header card-header--is-clickable", customClassName)}>
      {children}
    </div>
  ) : (
    <div className={classNames("card-header", customClassName)}>{children}</div>
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case KEYBOARD_EVENT_KEY.ENTER:
      case KEYBOARD_EVENT_KEY.SPACE:
        if (onClick) {
          onClick();
        }
        break;
      default:
        break;
    }
  }
}

export default CardHeader;
