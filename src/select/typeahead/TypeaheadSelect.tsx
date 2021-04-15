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
import {filterOutItemsByKey} from "../../core/utils/array/arrayUtils";
import Spinner from "../../spinner/Spinner";
import List from "../../list/List";
import ListItem from "../../list/item/ListItem";
import { KEYBOARD_EVENT_KEY } from "../../core/utils/keyboard/keyboardEventConstants";

export interface TypeaheadSelectProps {
  selectedOptions: DropdownOption[];
  dropdownOptions: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  testid?: string;
  typeaheadProps: Pick<TypeaheadInputProps, "id" | "placeholder" | "name" | "onFocus">;
  onKeywordChange?: (value: string) => void;
  initialKeyword?: string;
  controlledKeyword?: string;
  onTagRemove?: (option: DropdownOption) => void;
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
  areOptionsFetching,
  initialKeyword = "",
  controlledKeyword
}: TypeaheadSelectProps) {
  const typeaheadInputRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setMenuVisibility] = useState(false);
  const [computedDropdownOptions, setComputedDropdownOptions] = useState(dropdownOptions);
  const [shouldFocusOnInput, setShouldFocusOnInput] = useState(false);
  const [keyword, setKeyword] = useState(initialKeyword);
  const inputValue = typeof controlledKeyword === "string" ? controlledKeyword : keyword;

  const tags = mapDropdownOptionsToTagShapes(selectedOptions);
  const shouldDisplayOnlyTags = Boolean(
    selectedOptionLimit && selectedOptions.length >= selectedOptionLimit
  );

  const canSelectMultiple = !selectedOptionLimit || selectedOptionLimit > 1;
  const shouldCloseOnSelect =
    !canSelectMultiple ||
    Boolean(selectedOptionLimit && selectedOptions.length >= selectedOptionLimit - 1);

  const typeaheadSelectClassName = classNames("typeahead-select", customClassName, {
    "typeahead-select--has-selected-options": Boolean(selectedOptions.length),
    "typeahead-select--can-select-multiple": canSelectMultiple,
    "typeahead-select--is-dropdown-menu-open": isMenuOpen
  });

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
    <div className={"typeahead-select__header"}>
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
          customClassName={"typeahead-select__input"}
          inputContainerRef={typeaheadInputRef}
          id={typeaheadProps.id}
          name={typeaheadProps.name}
          placeholder={typeaheadProps.placeholder}
          value={inputValue}
          onQueryChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          rightIcon={
            areOptionsFetching ? (
              <Spinner spinnerColor={"#EBEBEB"} backgroundColor={"white"} />
            ) : (
              <CaretDownIcon aria-hidden={true} />
            )
          }
          onFocus={handleTypeaheadInputFocus}
          isDisabled={isDisabled}
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
    if (canOpenDropdownMenu && !isDisabled) {
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
      setKeyword("");
    }
  }

  function handleRemove(tag: TagShape<DropdownOption>) {
    if (onTagRemove) {
      onTagRemove(tag.context!);
      setShouldFocusOnInput(true);
    }
  }

  function handleKeywordChange(value: string) {
    if (shouldFilterOptionsByKeyword) {
      setComputedDropdownOptions(filterOptionsByKeyword(dropdownOptions, value));
    }

    if (onKeywordChange) {
      onKeywordChange(value);
    }

    if (typeof controlledKeyword === "undefined") {
      setKeyword(value);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const {key} = event;

    if (
      key === KEYBOARD_EVENT_KEY.BACKSPACE &&
      !inputValue &&
      onTagRemove &&
      selectedOptions.length
    ) {
      event.stopPropagation();
      onTagRemove(selectedOptions[selectedOptions.length - 1]);
    }
  }
}

export default TypeaheadSelect;
