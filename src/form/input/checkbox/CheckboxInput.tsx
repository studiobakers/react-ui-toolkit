import CheckIcon from "../../../ui/icons/check.svg";

import "./_checkbox-input.scss";

import React from "react";
import classNames from "classnames";

import {RadioInputItem} from "../../..";

export interface CheckboxInputProps {
  item: RadioInputItem;
  onSelect: (
    item: RadioInputItem,
    event?: React.SyntheticEvent<HTMLInputElement>
  ) => void;
  isSelected: boolean;
  isDisabled?: boolean;
  customIcon?: React.ReactNode;
  customClassName?: string;
  testid?: string;
}

function CheckboxInput({
  item,
  onSelect,
  customClassName,
  isSelected,
  isDisabled,
  customIcon,
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
  const icon = customIcon || <CheckIcon />;

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

      <span className={"checkbox-input-label__icon"}>{isSelected && icon}</span>

      {content}
    </label>
  );

  function handleCheckboxChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onSelect(item, event);
  }
}

export default CheckboxInput;
