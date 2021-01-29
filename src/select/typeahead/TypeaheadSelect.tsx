import CaretDownIcon from "../../ui/icons/caret-down.svg";

import "./_typeahead-select.scss";

import React, {useState, useEffect, useRef} from "react";
import classNames from "classnames";

import {DropdownOption} from "../../dropdown/list/item/DropdownListItem";
import TypeaheadInput, {
  TypeaheadInputProps
} from "../../form/input/typeahead/TypeaheadInput";
import {mapDropdownOptionsToTagShapes} from "../../tag/util/tagUtils";
import Tag, {TagShape} from "../../tag/Tag";
import Dropdown from "../../dropdown/Dropdown";
import {filterOptionsByKeyword} from "./util/typeaheadSelectUtils";
import {filterOutItemsByKey} from "../../core/utils/arrayUtils";
import Spinner from "../../spinner/Spinner";
import List from "../../list/List";
import ListItem from "../../list/item/ListItem";
import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboardEventConstants";

export interface TypeaheadSelectProps {
  testid?: string;
  selectedOptions: DropdownOption[];
  dropdownOptions: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  typeaheadProps: Omit<TypeaheadInputProps, "onQueryChange" | "testid">;
  onTagRemove?: (option: DropdownOption) => void;
  onKeywordChange?: (value: string) => void;
  selectedOptionLimit?: number;
  customClassName?: string;
  shouldDisplaySelectedOptions?: boolean;
  shouldFilterOptionsByKeyword?: boolean;
  isDisabled?: boolean;
  shouldShowEmptyOptions?: boolean;
  canOpenDropdownMenu?: boolean;
  areOptionsFetching?: boolean;
}

function TypeaheadSelect({
  testid,
  dropdownOptions,
  selectedOptions,
  typeaheadProps,
  onTagRemove,
  onKeywordChange,
  onSelect,
  customClassName,
  selectedOptionLimit,
  shouldDisplaySelectedOptions = true,
  shouldFilterOptionsByKeyword = true,
  isDisabled,
  shouldShowEmptyOptions = true,
  canOpenDropdownMenu = true,
  areOptionsFetching
}: TypeaheadSelectProps) {
  const [isMenuOpen, setMenuVisibility] = useState(false);
  const [computedDropdownOptions, setComputedDropdownOptions] = useState(dropdownOptions);
  const [shouldResetTypeaheadValue, setShouldResetTypeaheadValue] = useState(false);
  const [shouldFocusOnInput, setShouldFocusOnInput] = useState(false);
  const typeaheadSelectClassName = classNames(
    "typeahead-select__dropdown",
    customClassName
  );
  const tags = mapDropdownOptionsToTagShapes(selectedOptions);
  const shouldDisplayOnlyTags = Boolean(
    selectedOptionLimit && selectedOptions.length >= selectedOptionLimit
  );
  const canSelectMultiple = !selectedOptionLimit || selectedOptionLimit > 1;
  const shouldCloseOnSelect =
    !canSelectMultiple ||
    Boolean(selectedOptionLimit && selectedOptions.length >= selectedOptionLimit - 1);
  const typeaheadClassName = classNames("typeahead-select__input", {
    "typeahead-select__input--is-dropdown-menu-open": isMenuOpen,
    "typeahead-select__input--can-select-multiple": canSelectMultiple
  });
  const typeaheadInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setComputedDropdownOptions(dropdownOptions);
  }, [dropdownOptions]);

  useEffect(() => {
    let timeoutId: any;

    if (shouldFocusOnInput) {
      timeoutId = setTimeout(() => {
        if (typeaheadInputRef.current) {
          typeaheadInputRef.current.focus();
          setShouldFocusOnInput(false);
        }
      });
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldFocusOnInput]);

  const dropdownHeader = (
    <div className={"typeahead-select__dropdown__header"}>
      {shouldDisplaySelectedOptions && Boolean(tags.length) && (
        <List
          testid={`${testid}.tags`}
          items={tags}
          customClassName={"typeahead-select__tag-list"}>
          {(tag, tagTestId) => (
            <ListItem customClassName={"typeahead-select__tag-list__item"}>
              <Tag
                testid={tagTestId}
                onRemove={handleRemove}
                customClassName={"typeahead-select__tag"}
                tag={tag}
              />
            </ListItem>
          )}
        </List>
      )}

      {!shouldDisplayOnlyTags && (
        <TypeaheadInput
          testid={`${testid}.search`}
          customClassName={typeaheadClassName}
          inputContainerRef={typeaheadInputRef}
          id={typeaheadProps.id}
          name={typeaheadProps.name}
          placeholder={typeaheadProps.placeholder}
          value={typeaheadProps.value}
          onQueryChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          shouldResetValue={shouldResetTypeaheadValue}
          rightIcon={
            areOptionsFetching ? (
              <Spinner spinnerColor={"#EBEBEB"} backgroundColor={"white"} />
            ) : (
              <CaretDownIcon aria-hidden={true} />
            )
          }
          onFocus={handleTypeaheadInputFocus}
        />
      )}
    </div>
  );

  return (
    <Dropdown
      customClassName={typeaheadSelectClassName}
      headerWithoutButton={dropdownHeader}
      role={"listbox"}
      options={filterOutItemsByKey(computedDropdownOptions, "id", selectedOptions)}
      onSelect={handleSelect}
      selectedOption={null}
      isMenuOpenHook={[isMenuOpen, setMenuVisibility]}
      hasDeselectOption={false}
      shouldCloseOnSelect={shouldCloseOnSelect}
      shouldJumpToQuery={false}
      isDisabled={isDisabled}
      areOptionsFetching={areOptionsFetching}
      shouldShowEmptyOptions={shouldShowEmptyOptions}
      canOpenDropdownMenu={canOpenDropdownMenu}
    />
  );

  function openDropdownMenu() {
    setMenuVisibility(true);
  }

  function handleTypeaheadInputFocus(event: React.SyntheticEvent<HTMLInputElement>) {
    if (canOpenDropdownMenu) {
      openDropdownMenu();
    }

    if (typeaheadProps.onFocus) {
      typeaheadProps.onFocus(event);
    }
  }

  function handleSelect(option: DropdownOption | null) {
    if (!shouldDisplayOnlyTags) {
      onSelect(option!);
      setComputedDropdownOptions(dropdownOptions);
    }
  }

  function handleRemove(tag: TagShape<DropdownOption>) {
    if (onTagRemove) {
      onTagRemove(tag.context!);
      setShouldFocusOnInput(true);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const {key} = event;

    switch (key) {
      case KEYBOARD_EVENT_KEY.ESCAPE: {
        if (!computedDropdownOptions.length) {
          event.stopPropagation();

          if (onTagRemove) {
            onTagRemove(selectedOptions[selectedOptions.length - 1]);
          }
        }
        break;
      }

      default:
        break;
    }
  }

  function handleKeywordChange(value: string) {
    if (shouldFilterOptionsByKeyword) {
      setComputedDropdownOptions(filterOptionsByKeyword(dropdownOptions, value));
    }

    if (onKeywordChange) {
      onKeywordChange(value);
    }

    if (shouldResetTypeaheadValue && value === "") {
      setShouldResetTypeaheadValue(false);
    }
  }
}

export default TypeaheadSelect;
