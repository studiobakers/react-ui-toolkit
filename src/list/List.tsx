import "./_list.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

export interface ListProps<Item = any> {
  items: Item[];
  children: (item: Item, testid: string, index?: number) => JSX.Element;
  listItemKeyGenerator?: (item: Item, testid: string) => string;
  testid?: string;
  role?: string;
  customClassName?: string;
  placeholderProps?: {
    shouldDisplayPlaceholder: boolean;
    placeholder: React.ReactNode;
  };
  emptyStateProps?: {
    shouldDisplayEmptyState: boolean;
    emptyState: React.ReactNode;
  };
  type?: "unordered" | "ordered" | "description";
}

function List<Item extends any>({
  items,
  children,
  customClassName,
  testid,
  role,
  listItemKeyGenerator,
  placeholderProps,
  emptyStateProps,
  type = "unordered"
}: ListProps<Item>) {
  const listClassName = classNames("list", customClassName);

  switch (type) {
    case "unordered":
      return (
        <ul className={listClassName} role={role}>
          {items.map((item: Item, index: number) => {
            const listItemTestId = `${testid}.item-${index}`;
            let key = listItemTestId;

            // @ts-ignore
            if (item && typeof item === "object" && item.id) {
              // @ts-ignore
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
    case "ordered":
      return (
        <ol className={listClassName} role={role}>
          {items.map((item: Item, index: number) => {
            const listItemTestId = `${testid}.item-${index}`;
            let key = listItemTestId;

            // @ts-ignore
            if (item && typeof item === "object" && item.id) {
              // @ts-ignore
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
        </ol>
      );
    case "description":
      return (
        <dl className={listClassName} role={role}>
          {items.map((item: Item, index: number) => {
            const listItemTestId = `${testid}.item-${index}`;
            let key = listItemTestId;

            // @ts-ignore
            if (item && typeof item === "object" && item.id) {
              // @ts-ignore
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
        </dl>
      );
    default:
      return null;
  }
}

export default List;
