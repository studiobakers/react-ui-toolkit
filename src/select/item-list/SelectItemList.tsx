import React, {forwardRef, Ref} from "react";
import classNames from "classnames";

import {Option} from "../util/selectTypes";
import List, {ListElementType} from "../../list/List";
import Select from "../Select";
import {ListProps} from "../..";

export type SelectItemListProps<T extends Option = Option> = {
  options: T[];
  customClassName?: string;
  contentRenderer: (option: T) => React.ReactNode;
} & Omit<ListProps, "items" | "ref" | "children">;

/**
 * @returns a `List` of `Select.Item`s for the given options
 */
function SelectItemListComponent<T extends Option = Option>(
  {options, customClassName, contentRenderer, ...listProps}: SelectItemListProps<T>,
  ref: React.ForwardedRef<ListElementType>
) {
  return (
    <List
      ref={ref}
      items={options}
      customClassName={(classNames("select-item-list"), customClassName)}
      {...listProps}>
      {(option, listItemTestId) => (
        <Select.Item
          key={listItemTestId}
          as={"li"}
          option={option}
          customClassName={"select-item-list__item"}>
          {contentRenderer(option)}
        </Select.Item>
      )}
    </List>
  );
}

const SelectItemList = forwardRef(SelectItemListComponent);

export default SelectItemList as <T extends Option = Option>(
  props: SelectItemListProps<T> & {ref?: Ref<HTMLUListElement>}
) => JSX.Element;
