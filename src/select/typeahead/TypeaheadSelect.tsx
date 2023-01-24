import CaretDownIcon from "../../ui/icons/caret-down.svg";

import React, {useState, useEffect, useRef} from "react";
import classNames from "classnames";

import TypeaheadInput, {
  TypeaheadInputProps
} from "../../form/input/typeahead/TypeaheadInput";
import {mapOptionsToTagShapes} from "../../tag/util/tagUtils";
import {TagShape} from "../../tag/Tag";
import {filterOutItemsByKey} from "../../core/utils/array/arrayUtils";
import Spinner from "../../spinner/Spinner";
import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";
import {
  Option,
  TypeaheadSelectOption,
  TypeaheadSelectOptionSelectHandler
} from "../util/selectTypes";
import Select from "../Select";
import TypeheadSelectTrigger from "./trigger/TypeheadSelectTrigger";

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
  contentRenderer: (option: T) => React.ReactNode;
  onKeywordChange: (value: string) => void;
  testid?: string;
  controlledKeyword?: string;
  onTagRemove?: (option: Option) => void;
  selectedOptionLimit?: number;
  customClassName?: string;
  shouldDisplaySelectedOptions?: boolean;
  isDisabled?: boolean;
  customSpinner?: React.ReactNode;
  shouldShowEmptyOptions?: boolean;
  canOpenDropdownMenu?: boolean;
  areOptionsFetching?: boolean;
}

function TypeaheadSelect<T extends TypeaheadSelectOption = TypeaheadSelectOption>({
  testid,
  options,
  selectedOptions,
  typeaheadProps,
  onTagRemove,
  onKeywordChange,
  onSelect,
  contentRenderer,
  customClassName,
  selectedOptionLimit,
  shouldDisplaySelectedOptions = true,
  isDisabled,
  shouldShowEmptyOptions = true,
  canOpenDropdownMenu = true,
  areOptionsFetching,
  customSpinner,
  controlledKeyword = ""
}: TypeaheadSelectProps<T>) {
  const typeaheadInputRef = useRef<HTMLInputElement | null>(null);

  const [isMenuOpen, setMenuVisibility] = useState(false);
  const [computedDropdownOptions, setComputedDropdownOptions] = useState(options);
  const [shouldFocusOnInput, setShouldFocusOnInput] = useState(false);
  const [keyword, setKeyword] = useState(controlledKeyword);

  const tags = mapOptionsToTagShapes(selectedOptions, contentRenderer);
  const shouldDisplayOnlyTags = Boolean(
    selectedOptionLimit && selectedOptions.length >= selectedOptionLimit
  );

  const canSelectMultiple =
    options.length > 1 && (!selectedOptionLimit || selectedOptionLimit > 1);

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
      testid={testid}
      role={"listbox"}
      onSelect={handleSelect}
      options={computedDropdownOptions}
      customClassName={typeaheadSelectClassName}
      value={selectedOptions}
      isDisabled={isDisabled}
      shouldCloseOnSelect={shouldCloseOnSelect}>
      <TypeheadSelectTrigger
        tags={shouldDisplaySelectedOptions ? tags : []}
        handleTagRemove={handleRemove}
        onClick={openDropdownMenu}
        input={
          !shouldDisplayOnlyTags && (
            <TypeaheadInput
              testid={`${testid}.search`}
              customClassName={"typeahead-select__input"}
              id={typeaheadProps.id}
              name={typeaheadProps.name}
              type={typeaheadProps.type}
              placeholder={typeaheadProps.placeholder}
              value={keyword}
              onQueryChange={handleQueryChange}
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
            {contentRenderer(option)}
          </Select.Item>
        ))}

        {shouldShowEmptyOptions && !computedDropdownOptions.length && (
          <p
            data-testid={`${testid}.empty-message`}
            className={"dropdown-list__empty-message"}>
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

      if (shouldCloseOnSelect) {
        setMenuVisibility(false);
      } else {
        setShouldFocusOnInput(true);
      }
    }
  }

  function handleRemove(tag: TagShape<Option>) {
    if (onTagRemove) {
      onTagRemove(tag.context!);
      setShouldFocusOnInput(true);
      setMenuVisibility(false);
      setKeyword("");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const {key} = event;

    if (
      key === KEYBOARD_EVENT_KEY.BACKSPACE &&
      keyword === "" &&
      onTagRemove &&
      selectedOptions.length
    ) {
      event.stopPropagation();
      onTagRemove(selectedOptions[selectedOptions.length - 1]);
    }
  }

  function handleQueryChange(value: string) {
    setKeyword(value);

    onKeywordChange(value);
  }
}

export default TypeaheadSelect;
