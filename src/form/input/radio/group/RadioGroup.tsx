import "./_radio-group.scss";

import React from "react";
import classNames from "classnames";

import RadioInput, {RadioInputItem, RadioInputSelectHandler} from "../RadioInput";
import List from "../../../../list/List";
import ListItem from "../../../../list/item/ListItem";

export interface RadioGroupProps<Id, Context> {
  items: RadioInputItem<Id, Context>[];
  selectedItem: null | RadioInputItem<Id, Context>;
  onSelect: RadioInputSelectHandler<Id, Context>;
  customClassName?: string;
  isDisabled?: boolean;
  testid?: string;
}

function RadioGroup<Id = string, Context = any>({
  items,
  testid,
  onSelect,
  selectedItem,
  customClassName,
  isDisabled
}: RadioGroupProps<Id, Context>) {
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
