import "./_dropdown-list-item.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

export interface DropdownOption<Id = string, Context = any> {
  id: Id;
  customClassName?: string;
  title: string;
  CustomContent?: JSX.Element;
  icon?: React.ReactNode;
  subtitle?: string;
  context?: Context;
}

export type TDropdownOptionSelectHandler<Id = string, Context = any> = (
  option: DropdownOption<Id, Context> | null,
  event?: React.SyntheticEvent<HTMLLIElement>
) => void;

export type TDropdownSelectedOption<Id = string, Context = any> =
  | DropdownOption<Id, Context>
  | null
  | undefined;

interface DropdownListItemProps<OptionIdShape = string> {
  testid: string;
  option: DropdownOption<OptionIdShape>;
  selectedOption: TDropdownSelectedOption<OptionIdShape>;
  focusedOption?: TDropdownSelectedOption<OptionIdShape>;
  onSelect: TDropdownOptionSelectHandler<OptionIdShape>;
  onFocus: TDropdownOptionSelectHandler<OptionIdShape>;
  onKeyDown?: TDropdownOptionSelectHandler<OptionIdShape>;
  onMouseDown?: React.ReactEventHandler<HTMLLIElement>;
  onMouseUp?: React.ReactEventHandler<HTMLLIElement>;
  canSelectAlreadySelected?: boolean;
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
  canSelectAlreadySelected = false
}: DropdownListItemProps<OptionIdShape>) {
  const {id: optionId, customClassName, icon, title, subtitle, CustomContent} = option;
  const isSelected = Boolean(selectedOption && optionId === selectedOption.id);
  const canItemBeClicked = !isSelected || canSelectAlreadySelected;
  const containerClassName = classNames("dropdown-list-item", customClassName, {
    selected: isSelected,
    focused: Boolean(focusedOption && optionId === focusedOption.id),
    "can-be-selected": canItemBeClicked
  });

  return (
    <li
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
          {icon}

          <div className={"dropdown-list-item-title-container"}>
            <p data-testid={`${testid}.title`} className={"dropdown-list-item-title"}>
              {title}
            </p>

            {subtitle && (
              <p
                data-testid={`${testid}.subtitle`}
                className={"dropdown-list-item-subtitle"}>
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
