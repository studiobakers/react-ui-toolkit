import "./_list.scss";

import React, {Fragment} from "react";
import classNames from "classnames";
import {Button} from "..";
import Spinner from "../spinner/Spinner";

interface ListProps<Item = any> {
  testid: string;
  customClassName?: string;
  items: Item;
  isPending?: boolean;
  children: (item: Item, testid: string, index?: number) => JSX.Element;
  listItemKeyGenerator?: (item: Item, testid: string) => string;
  emptyStateMessage?: React.ReactNode;
  emptyStateButtonText?: string;
  onEmptyStateButtonClick?: () => void;
  canDisplayEmptyState?: boolean;
  placeholders?: React.ReactNode;
  canDisplayPlaceholder?: boolean;
}

/* eslint-disable complexity */
function List<Item extends any>({
  items,
  children,
  customClassName,
  testid,
  listItemKeyGenerator,
  isPending,
  canDisplayPlaceholder,
  canDisplayEmptyState,
  placeholders,
  emptyStateMessage,
  emptyStateButtonText,
  onEmptyStateButtonClick
}: ListProps<Item>) {
  const listClassName = classNames("list", customClassName);

  return (
    <div className={listClassName}>
      {items.map((item: Item, index: number) => {
        const listItemTestId = `${testid}.item-${index}`;
        let key = listItemTestId;

        if (item && typeof item === "object" && item.id) {
          key = item.id;
        }

        if (listItemKeyGenerator) {
          key = listItemKeyGenerator(item, listItemTestId);
        }

        return <Fragment key={key}>{children(item, listItemTestId, index)}</Fragment>;
      })}

      {isPending && canDisplayPlaceholder && placeholders}
      {isPending && !canDisplayPlaceholder && (
        <Spinner spinnerColor={"black"} backgroundColor={"white"} />
      )}

      {!isPending && !items.length && canDisplayEmptyState && (
        <div className={"list-empty-state-container"}>
          <span className={"list-empty-state-icon"} />

          <p className={"list-empty-state-message"}>
            {emptyStateMessage || "This list is empty"}
          </p>

          {Boolean(emptyStateButtonText && onEmptyStateButtonClick) && (
            <Button
              customClassName={"list-empty-state-button"}
              testid={"list.empty-state-button"}
              onClick={onEmptyStateButtonClick}>
              {emptyStateButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
/* eslint-enable complexity */

export default List;
