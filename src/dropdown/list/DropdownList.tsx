import "./_dropdown-list.scss";

import React, {useRef, useEffect} from "react";
import classNames from "classnames";

import DropdownListItem, {
  DropdownOption,
  DropdownOptionSelectHandler,
  DropdownSelectedOption
} from "./item/DropdownListItem";
import {computeScrollAmountToMakeChildVisible} from "../../core/utils/domUtils";

interface DropdownListProps<OptionIdShape extends string> {
  testid?: string;
  options: DropdownOption<OptionIdShape>[];
  selectedOption: DropdownSelectedOption<OptionIdShape>;
  focusedOption: DropdownSelectedOption<OptionIdShape>;
  onSelect: DropdownOptionSelectHandler<OptionIdShape>;
  onFocus: DropdownOptionSelectHandler<OptionIdShape>;
  onMouseDown?: React.ReactEventHandler<HTMLLIElement>;
  onMouseUp?: React.ReactEventHandler<HTMLLIElement>;
  onKeyDown?: DropdownOptionSelectHandler<OptionIdShape>;
  role?: "listbox" | "menu" | "combobox";
  customClassName?: string;
  ariaLabelledBy?: string;
  ariaHidden?: boolean;
  isMultiSelect?: boolean;
  children?: never;
  canSelectAlreadySelected?: boolean;
  noOptionsMessage?: string;
}

function DropdownList<OptionIdShape extends string>({
  testid,
  options,
  customClassName,
  role,
  ariaLabelledBy,
  ariaHidden,
  isMultiSelect,
  selectedOption,
  focusedOption,
  onSelect,
  onFocus,
  onKeyDown,
  onMouseDown,
  onMouseUp,
  canSelectAlreadySelected,
  noOptionsMessage
}: DropdownListProps<OptionIdShape>) {
  const listRef = useRef<HTMLUListElement>(null);
  const containerClassName = classNames("dropdown-list", customClassName);

  useEffect(() => {
    if (listRef.current) {
      const focusedOptionElement =
        focusedOption && document.getElementById(focusedOption.id);

      if (focusedOptionElement) {
        listRef.current.scrollTop += computeScrollAmountToMakeChildVisible(
          listRef.current,
          focusedOptionElement
        );
      }
    }
  }, [focusedOption]);

  useEffect(() => {
    if (listRef.current) {
      const selectedOptionElement =
        selectedOption && document.getElementById(selectedOption.id);

      if (selectedOptionElement) {
        listRef.current.scrollTop += computeScrollAmountToMakeChildVisible(
          listRef.current,
          selectedOptionElement
        );
      }
    }
  }, [selectedOption]);

  return (
    <ul
      ref={listRef}
      data-testid={testid}
      role={role}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaHidden}
      aria-multiselectable={isMultiSelect}
      className={containerClassName}>
      {options.length ? (
        options.map(renderDropdownListItem)
      ) : (
        <p data-testid={`${testid}.empty-message`} className={"dropdown-empty-message"}>
          {noOptionsMessage || "No available options"}
        </p>
      )}
    </ul>
  );

  function renderDropdownListItem(option: DropdownOption<OptionIdShape>, index: number) {
    return (
      <DropdownListItem
        key={option.id}
        testid={`${testid}.item-${index}`}
        option={option}
        selectedOption={selectedOption}
        focusedOption={focusedOption}
        onSelect={onSelect}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        canSelectAlreadySelected={canSelectAlreadySelected}
      />
    );
  }
}

export default DropdownList;
