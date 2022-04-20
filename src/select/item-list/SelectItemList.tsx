import React from "react";
import classNames from "classnames";

import {Option} from "../util/selectTypes";
import List from "../../list/List";
import Select from "../Select";

export interface SelectItemListProps {
  options: Option[];
  customClassName?: string;
}

/**
 * @returns a `List` of `Select.Item`s for the given options
 */
function SelectItemList({options, customClassName}: SelectItemListProps) {
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
          {option.title}
        </Select.Item>
      )}
    </List>
  );
}

export default SelectItemList;
