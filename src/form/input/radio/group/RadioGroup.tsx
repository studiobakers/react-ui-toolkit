import "./_radio-group.scss";

import React from "react";
import classNames from "classnames";

import RadioInput, {RadioInputItem, RadioInputProps} from "../RadioInput";
import List from "../../../../list/List";
import ListItem from "../../../../list/item/ListItem";

export interface RadioGroupProps {
  items: RadioInputItem[];
  selectedItem: null | RadioInputItem;
  onSelect: RadioInputProps["onSelect"];
  customClassName?: string;
  isDisabled?: boolean;
  testid?: string;
}

function RadioGroup({
  items,
  testid,
  onSelect,
  selectedItem,
  customClassName,
  isDisabled
}: RadioGroupProps) {
  return (
    <List
      testid={testid}
      items={items}
      customClassName={classNames("radio-group", customClassName)}>
      {(item, itemTestId) => (
        <ListItem customClassName={classNames("radio-group__item", item.customClassName)}>
          <RadioInput
            testid={itemTestId}
            isDisabled={isDisabled || item.isDisabled}
            item={item}
            onSelect={onSelect}
            isSelected={Boolean(selectedItem && selectedItem.id === item.id)}
          />
        </ListItem>
      )}
    </List>
  );
}

export default RadioGroup;
