import "./_radio.scss";

import React from "react";
import classNames from "classnames";

export interface RadioInputItem<Id = string> {
  testid: string;
  id: Id;
  content: React.ReactNode;
  inputProps: {
    htmlFor: string;
    value: string;
    name: string;
  };
  context?: any;
  customClassName?: string;
  isDisabled?: boolean;
}

export type RadioInputSelectHandler<Id = string> = (
  name: RadioInputItem["inputProps"]["name"],
  item: RadioInputItem<Id>
) => void;

export interface RadioInputProps {
  item: RadioInputItem;
  onSelect: RadioInputSelectHandler;
  isSelected: boolean;
  isDisabled?: boolean;
}

function RadioInput({item, onSelect, isSelected, isDisabled}: RadioInputProps) {
  const {
    inputProps: {name, value, htmlFor},
    testid,
    content
  } = item;
  const containerClassName = classNames("radio-input-label", {
    selected: isSelected,
    disabled: isDisabled
  });

  return (
    <label data-testid={testid} htmlFor={htmlFor} className={containerClassName}>
      <input
        type={"radio"}
        id={htmlFor}
        name={name}
        value={value}
        className={"radio-input"}
        onChange={handleRadioButtonChange}
        checked={isSelected}
        disabled={isDisabled}
      />

      <span className={"radio-input-icon"} />

      {content}
    </label>
  );

  function handleRadioButtonChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onSelect(event.currentTarget.name, item);
  }
}

export default RadioInput;
