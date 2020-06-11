import CheckIcon from "../../../ui/icons/check.svg";

import "./_checkbox.scss";

import React from "react";
import classNames from "classnames";

export interface CheckboxInputItem {
  testid?: string;
  id: string;
  content: React.ReactNode;
  inputProps: {
    htmlFor: string;
    value: string;
    name: string;
  };
}

export interface CheckboxInputProps {
  item: CheckboxInputItem;
  onSelect: (name: string, item: CheckboxInputItem) => void;
  isSelected: boolean;
  isDisabled?: boolean;
  customClassName?: string;
}

function CheckboxInput({
  item,
  onSelect,
  customClassName,
  isSelected,
  isDisabled
}: CheckboxInputProps) {
  const {
    inputProps: {name, value, htmlFor},
    testid,
    content
  } = item;
  const containerClassName = classNames("checkbox-input-label", customClassName, {
    selected: isSelected,
    disabled: isDisabled
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

      <div className={"checkbox-input-icon-wrapper"}>
        <span className={"checkbox-input-icon"}>
          <CheckIcon />
        </span>
      </div>

      {content}
    </label>
  );

  function handleCheckboxChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onSelect(event.currentTarget.name, item);
  }
}

export default CheckboxInput;
