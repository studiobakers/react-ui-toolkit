import "./_radio-group.scss";

import React from "react";
import classNames from "classnames";

import RadioInput, {RadioInputItem, RadioInputProps} from "../Radio";

interface RadioGroupProps {
  testid?: string;
  items: RadioInputItem[];
  selectedItem: null | RadioInputItem;
  onSelect: RadioInputProps["onSelect"];
  customClassName?: string;
  isDisabled?: boolean;
}

function RadioGroup({
  items,
  testid,
  onSelect,
  selectedItem,
  customClassName,
  isDisabled
}: RadioGroupProps) {
  const radioGroupClassName = classNames("radio-group", customClassName);

  return (
    <ul data-testid={testid} className={radioGroupClassName}>
      {items.map((item) => (
        <li
          key={item.id}
          className={classNames("radio-group-item", item.customClassName)}>
          <RadioInput
            isDisabled={isDisabled || item.isDisabled}
            item={item}
            onSelect={onSelect}
            isSelected={Boolean(selectedItem && selectedItem.id === item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default RadioGroup;
