import "./_list-item.scss";

import React from "react";
import classNames from "classnames";

import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";

export interface ListItemProps {
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
  const listItemProps: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > & {
    "data-testid": string | undefined;
  } = {
    ref: listItemRef,
    id,
    "data-testid": testid,
    className: containerClassName,
    role,
    "aria-selected": ariaSelected
  };
  let listItem = <li {...listItemProps}>{children}</li>;

  if (clickableListItemProps) {
    listItem = (
      <li {...listItemProps}>
        <div
          role={"button"}
          tabIndex={clickableListItemProps.tabIndex || 0}
          className={"list-item__click-wrapper"}
          onClick={handleClick}
          onKeyDown={handleKeyDown}>
          {children}
        </div>
      </li>
    );
  }

  return listItem;

  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();

    clickableListItemProps?.onClick(event);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if ([KEYBOARD_EVENT_KEY.ENTER, KEYBOARD_EVENT_KEY.SPACE].includes(event.key)) {
      handleClick(event);
    }
  }
}

export default ListItem;
