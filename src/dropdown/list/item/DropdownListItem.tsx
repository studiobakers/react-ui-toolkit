import "./_dropdown-list-item.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

export interface DropdownOption<Id = string, Context = any> {
  id: Id;
  title: string;
  customClassName?: string;
  CustomContent?: JSX.Element;
  icon?: React.ReactNode;
  subtitle?: string;
  context?: Context;
  isDisabled?: boolean;
}

export type DropdownOptionSelectHandler<Id = string, Context = any> = (
  option: DropdownOption<Id, Context> | null,
  event?: React.SyntheticEvent<HTMLLIElement>
) => void;

export type DropdownSelectedOption<Id = string, Context = any> =
  | DropdownOption<Id, Context>
  | null
  | undefined;

export interface DropdownListItemProps<OptionIdShape = string> {
  testid?: string;
  option: DropdownOption<OptionIdShape>;
  selectedOption: DropdownSelectedOption<OptionIdShape>;
  focusedOption?: DropdownSelectedOption<OptionIdShape>;
  onSelect: DropdownOptionSelectHandler<OptionIdShape>;
  onFocus: DropdownOptionSelectHandler<OptionIdShape>;
  onKeyDown?: DropdownOptionSelectHandler<OptionIdShape>;
  onMouseDown?: React.ReactEventHandler<HTMLLIElement>;
  onMouseUp?: React.ReactEventHandler<HTMLLIElement>;
  canSelectAlreadySelected?: boolean;
  focusedItemRef?: React.RefObject<HTMLLIElement>;
}

function DropdownListItem<OptionIdShape extends string>({
  testid,
  option,
  selectedOption,
  onSelect,
  focusedOption,
  onFocus,
  onKeyDown,
  onMouseDown,
  onMouseUp,
  canSelectAlreadySelected = false,
  focusedItemRef
}: DropdownListItemProps<OptionIdShape>) {
  const {id: optionId, customClassName, icon, title, subtitle, CustomContent} = option;
  const isSelected = Boolean(selectedOption && optionId === selectedOption.id);
  const canItemBeClicked =
    !option.isDisabled && (!isSelected || canSelectAlreadySelected);
  const containerClassName = classNames("dropdown-list-item", customClassName, {
    "dropdown-list-item--is-selected": isSelected,
    "dropdown-list-item--is-focused": Boolean(
      focusedOption && optionId === focusedOption.id
    ),
    "dropdown-list-item--can-be-selected": canItemBeClicked,
    "dropdown-list-item--is-disabled": option.isDisabled
  });

  return (
    <li
      ref={focusedItemRef}
      data-testid={testid}
      id={optionId}
      role={"option"}
      className={containerClassName}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleFocus}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}>
      {CustomContent || (
        <Fragment>
          <div className={"dropdown-list-item__icon"}>{icon}</div>

          <div className={"dropdown-list-item__content"}>
            <p data-testid={`${testid}.title`} className={"dropdown-list-item__title"}>
              {title}
            </p>

            {subtitle && (
              <p
                data-testid={`${testid}.subtitle`}
                className={"dropdown-list-item__subtitle"}>
                {subtitle}
              </p>
            )}
          </div>
        </Fragment>
      )}
    </li>
  );

  function handleClick(event: React.SyntheticEvent<HTMLLIElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (canItemBeClicked) {
      onSelect(option, event);
    }
  }

  function handleFocus(event: React.SyntheticEvent<HTMLLIElement>) {
    onFocus(option, event);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    if (onKeyDown) {
      onKeyDown(option, event);
    }
  }
}

export default DropdownListItem;
