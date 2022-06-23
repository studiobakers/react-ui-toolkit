import React from "react";
import classNames from "classnames";

import {Option} from "../util/selectTypes";
import List from "../../list/List";
import Select from "../Select";

export interface SelectItemListProps<T extends Option = Option> {
  options: T[];
  customClassName?: string;
  contentRenderer: (option: T) => React.ReactNode;
}

/**
 * @returns a `List` of `Select.Item`s for the given options
 */
function SelectItemList<T extends Option = Option>({
  options,
  customClassName,
  contentRenderer
}: SelectItemListProps<T>) {
  return (
    <List
      items={options}
      customClassName={(classNames("select-item-list"), customClassName)}>
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

export default SelectItemList;
