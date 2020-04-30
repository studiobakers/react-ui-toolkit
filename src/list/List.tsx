import "./_list.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

interface ListProps<Item = any> {
  testid: string;
  customClassName?: string;
  items: Item;
  children: (item: Item, testid: string, index?: number) => JSX.Element;
  listItemKeyGenerator?: (item: Item, testid: string) => string;
  placeholderProps?: {
    shouldDisplayPlaceholder: boolean;
    placeholder: React.ReactNode;
  };
  emptyStateProps?: {
    shouldDisplayEmptyState: boolean;
    emptyState: React.ReactNode;
  };
}

/* eslint-disable complexity */
function List<Item extends any>({
  items,
  children,
  customClassName,
  testid,
  listItemKeyGenerator,
  placeholderProps,
  emptyStateProps
}: ListProps<Item>) {
  const listClassName = classNames("list", customClassName);

  return (
    <ul className={listClassName}>
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

      {placeholderProps?.shouldDisplayPlaceholder && placeholderProps.placeholder}

      {!placeholderProps?.shouldDisplayPlaceholder &&
        emptyStateProps?.shouldDisplayEmptyState &&
        emptyStateProps.emptyState}
    </ul>
  );
}
/* eslint-enable complexity */

export default List;
