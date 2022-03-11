import "./_dropdown-list.scss";

import React, {useRef, useLayoutEffect} from "react";
import classNames from "classnames";

import DropdownListItem, {
  DropdownOption,
  DropdownOptionSelectHandler,
  DropdownSelectedOption
} from "./item/DropdownListItem";
import {computeScrollAmountToMakeChildVisible} from "../../core/utils/dom/domUtils";

export interface DropdownListProps<OptionIdShape extends string> {
  isVisible: boolean;
  options: DropdownOption<OptionIdShape>[];
  selectedOption: DropdownSelectedOption<OptionIdShape>;
  focusedOption: DropdownSelectedOption<OptionIdShape>;
  onSelect: DropdownOptionSelectHandler<OptionIdShape>;
  onFocus: DropdownOptionSelectHandler<OptionIdShape>;
  testid?: string;
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
  isVisible,
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
  const listItemRef = useRef<HTMLLIElement>(null);
  const containerClassName = classNames("dropdown-list", customClassName, {
    "dropdown-list--is-visible": isVisible
  });

  useLayoutEffect(() => {
    if (isVisible && listRef.current && listItemRef.current) {
      listRef.current.scrollTop += computeScrollAmountToMakeChildVisible(
        listRef.current,
        listItemRef.current
      );
    }
  }, [isVisible, focusedOption]);

  return (
    // Use <List /> an <ListItem /> instead of <ul> and <li>
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
        <li className={"dropdown-list-item dropdown-list__empty-message-item"}>
          <p
            data-testid={`${testid}.empty-message`}
            className={"dropdown-list__empty-message"}>
            {noOptionsMessage || "No available options"}
          </p>
        </li>
      )}
    </ul>
  );

  function renderDropdownListItem(option: DropdownOption<OptionIdShape>, index: number) {
    return (
      <DropdownListItem
        key={option.id}
        focusedItemRef={option.id === focusedOption?.id ? listItemRef : undefined}
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
