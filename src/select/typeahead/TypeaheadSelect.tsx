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

export interface TypeaheadSelectProps {
  testid?: string;
  selectedOptions: DropdownOption[];
  dropdownOptions: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  typeaheadProps: Omit<TypeaheadInputProps, "onQueryChange" | "testid" | "value">;
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
    "typeahead-select-dropdown",
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
  const typeaheadClassName = classNames("typeahead-select-header", {
    "is-dropdown-menu-open": isMenuOpen,
    "can-select-multiple": canSelectMultiple
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
    <div className={"typeahead-select-header-container"}>
      {shouldDisplaySelectedOptions && Boolean(tags.length) && (
        <div className={"typeahead-select-header-tags-container"}>
          {tags.map((tag, index) => (
            <Tag
              key={tag.id}
              testid={`${testid}.tag-${index}`}
              onRemove={handleRemove}
              customClassName={"typeahead-select-tag"}
              tag={tag}
            />
          ))}
        </div>
      )}

      {!shouldDisplayOnlyTags && (
        <TypeaheadInput
          testid={`${testid}.search`}
          customClassName={typeaheadClassName}
          inputContainerRef={typeaheadInputRef}
          id={typeaheadProps.id}
          name={typeaheadProps.name}
          placeholder={typeaheadProps.placeholder}
          onQueryChange={handleKeywordChange}
          shouldResetValue={shouldResetTypeaheadValue}
          rightIcon={
            areOptionsFetching ? (
              <Spinner spinnerColor={"#EBEBEB"} backgroundColor={"white"} />
            ) : (
              <CaretDownIcon aria-hidden={true} />
            )
          }
          onFocus={openDropdownMenu}
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

  function handleSelect(option: DropdownOption | null) {
    if (!shouldDisplayOnlyTags) {
      onSelect(option!);
      setShouldResetTypeaheadValue(true);
      setComputedDropdownOptions(dropdownOptions);
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

    if (shouldResetTypeaheadValue && value === "") {
      setShouldResetTypeaheadValue(false);
    }
  }
}

export default TypeaheadSelect;
