import CheckIcon from "../../../ui/icons/check.svg";

import "./_checkbox-input.scss";

import React from "react";
import classNames from "classnames";

export interface CheckboxInputItem<Id = string, Context = any> {
  id: Id;
  content: React.ReactNode;
  inputProps: {
    htmlFor: string;
    value: string;
    name: string;
  };
  context?: Context;
}

export interface CheckboxInputProps {
  item: CheckboxInputItem;
  onSelect: (
    item: CheckboxInputItem,
    event?: React.SyntheticEvent<HTMLInputElement>
  ) => void;
  isSelected: boolean;
  isDisabled?: boolean;
  customClassName?: string;
  testid?: string;
}

function CheckboxInput({
  item,
  onSelect,
  customClassName,
  isSelected,
  isDisabled,
  testid
}: CheckboxInputProps) {
  const {
    inputProps: {name, value, htmlFor},
    content
  } = item;
  const containerClassName = classNames("checkbox-input-label", customClassName, {
    "checkbox-input-label--is-selected": isSelected,
    "checkbox-input-label--is-disabled": isDisabled
  });

  return (
    <label data-testid={testid} htmlFor={htmlFor} className={containerClassName}>
      <input
        type={"checkbox"}
        id={htmlFor}
        name={name}
        value={value}
        className={"checkbox-input"}
        onChange={handleCheckboxChange}
        checked={isSelected}
        disabled={isDisabled}
      />

      <span className={"checkbox-input-label__icon"}>
        <CheckIcon />
      </span>

      {content}
    </label>
  );

  function handleCheckboxChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onSelect(item, event);
  }
}

export default CheckboxInput;
