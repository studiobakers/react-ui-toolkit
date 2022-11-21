import CaretDownIcon from "../../ui/icons/caret-down.svg";

import React, {useState, useEffect, useRef} from "react";
import classNames from "classnames";

import TypeaheadInput, {
  TypeaheadInputProps
} from "../../form/input/typeahead/TypeaheadInput";
import {mapOptionsToTagShapes} from "../../tag/util/tagUtils";
import {TagShape} from "../../tag/Tag";
import {filterOptionsByKeyword} from "./util/typeaheadSelectUtils";
import {filterOutItemsByKey} from "../../core/utils/array/arrayUtils";
import Spinner from "../../spinner/Spinner";
import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";
import {
  Option,
  TypeaheadSelectOption,
  TypeaheadSelectOptionSelectHandler
} from "../util/selectTypes";
import Select from "../Select";
import TypeheadSelectTrigger from "./trigger/TypeaheadSelectTrigger";

import "./_typeahead-select.scss";

export interface TypeaheadSelectProps<
  T extends TypeaheadSelectOption = TypeaheadSelectOption
> {
  selectedOptions: T[];
  options: T[];
  onSelect: TypeaheadSelectOptionSelectHandler<T>;
  typeaheadProps: Pick<
    TypeaheadInputProps,
    "id" | "placeholder" | "name" | "onFocus" | "type"
  >;
  testid?: string;
  onKeywordChange?: (value: string) => void;
  initialKeyword?: string;
  controlledKeyword?: string;
  onTagRemove?: (option: Option) => void;
  selectedOptionLimit?: number;
  customClassName?: string;
  shouldDisplaySelectedOptions?: boolean;
  shouldFilterOptionsByKeyword?: boolean;
  isDisabled?: boolean;
  customSpinner?: React.ReactNode;
  shouldShowEmptyOptions?: boolean;
  canOpenDropdownMenu?: boolean;
  areOptionsFetching?: boolean;
}

/* eslint-disable complexity */
function TypeaheadSelect<T extends TypeaheadSelectOption = TypeaheadSelectOption>({
  testid,
  options,
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
  customSpinner,
  initialKeyword = "",
  controlledKeyword
}: TypeaheadSelectProps<T>) {
  const typeaheadInputRef = useRef<HTMLInputElement | null>(null);

  const [isMenuOpen, setMenuVisibility] = useState(false);
  const [computedDropdownOptions, setComputedDropdownOptions] = useState(options);
  const [shouldFocusOnInput, setShouldFocusOnInput] = useState(false);
  const [keyword, setKeyword] = useState(initialKeyword);
  const inputValue = typeof controlledKeyword === "string" ? controlledKeyword : keyword;

  const tags = mapOptionsToTagShapes(selectedOptions);
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
  const spinnerContent = customSpinner || (
    <Spinner customClassName={"typeahead-select__spinner"} />
  );

  useEffect(() => {
    setComputedDropdownOptions(options);
  }, [options]);

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

  useEffect(() => {
    setComputedDropdownOptions(filterOutItemsByKey(options, "id", selectedOptions));
  }, [options, selectedOptions]);

  return (
    // TODO: Add isMenuOpenHook when we have it
    <Select
      role={"listbox"}
      onSelect={handleSelect}
      options={computedDropdownOptions}
      customClassName={typeaheadSelectClassName}
      value={selectedOptions}
      isDisabled={isDisabled}
      shouldCloseOnSelect={shouldCloseOnSelect}
    >
      <TypeheadSelectTrigger
        tags={shouldDisplaySelectedOptions ? tags : []}
        handleTagRemove={handleRemove}
        input={
          !shouldDisplayOnlyTags && (
            <TypeaheadInput
              testid={`${testid}.search`}
              customClassName={"typeahead-select__input"}
              id={typeaheadProps.id}
              name={typeaheadProps.name}
              type={typeaheadProps.type}
              placeholder={typeaheadProps.placeholder}
              value={inputValue}
              onQueryChange={handleKeywordChange}
              onKeyDown={handleKeyDown}
              rightIcon={
                areOptionsFetching ? spinnerContent : <CaretDownIcon aria-hidden={true} />
              }
              onFocus={handleTypeaheadInputFocus}
              isDisabled={isDisabled}
            />
          )
        }
      />

      <Select.Content>
        {computedDropdownOptions.map((option) => (
          <Select.Item key={option.id} option={option}>
            {option.title}
          </Select.Item>
        ))}
        {shouldShowEmptyOptions && !computedDropdownOptions.length && (
          <p
            data-testid={`${testid}.empty-message`}
            className={"dropdown-list__empty-message"}
          >
            {"No available options"}
          </p>
        )}
      </Select.Content>
    </Select>
  );

  function openDropdownMenu() {
    setMenuVisibility(true);
  }

  function handleTypeaheadInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (canOpenDropdownMenu && !isDisabled) {
      openDropdownMenu();
    }

    if (typeaheadProps.onFocus) {
      typeaheadProps.onFocus(event);
    }
  }

  function handleSelect(option: T) {
    if (!shouldDisplayOnlyTags && !isDisabled) {
      onSelect(option);
      setComputedDropdownOptions(options);
      setKeyword("");
      setShouldFocusOnInput(true);
    }
  }

  function handleRemove(tag: TagShape<Option>) {
    if (onTagRemove) {
      onTagRemove(tag.context!);
      setShouldFocusOnInput(true);
    }
  }

  function handleKeywordChange(value: string) {
    if (shouldFilterOptionsByKeyword) {
      const unselectedOptions = options.filter(
        (option) => selectedOptions.indexOf(option) < 0
      );

      setComputedDropdownOptions(filterOptionsByKeyword(unselectedOptions, value));
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
/* eslint-enable complexity */

export default TypeaheadSelect;
