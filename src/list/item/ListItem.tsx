import "./_list-item.scss";

import React from "react";
import classNames from "classnames";

import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";

interface ListItemProps {
  children?: React.ReactNode;
  testid?: string;
  customClassName?: string;
  clickableListItemProps?: {
    onClick: React.ReactEventHandler;
    tabIndex?: number;
  };
  id?: string;
  role?: string;
  ariaSelected?: boolean;
  listItemRef?: React.RefObject<HTMLLIElement>;
}

function ListItem({
  id,
  testid,
  children,
  customClassName,
  clickableListItemProps,
  role,
  ariaSelected,
  listItemRef
}: ListItemProps) {
  const containerClassName = classNames("list-item", customClassName);
  let listItem = (
    <li
      ref={listItemRef}
      id={id}
      data-testid={testid}
      className={containerClassName}
      role={role}
      aria-selected={ariaSelected}>
      {children}
    </li>
  );

  if (clickableListItemProps) {
    listItem = (
      <li ref={listItemRef} id={id} data-testid={testid} className={containerClassName}>
        <div
          role={"button"}
          tabIndex={clickableListItemProps.tabIndex || 0}
          className={"list-item__click-wrapper"}
          onClick={handleClick}
          onKeyPress={handleKeyPress}>
          {children}
        </div>
      </li>
    );
  }

  return listItem;

  function handleClick(event: React.SyntheticEvent) {
    clickableListItemProps!.onClick(event);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === KEYBOARD_EVENT_KEY.ENTER) {
      handleClick(event);
    }
  }
}

export default ListItem;
