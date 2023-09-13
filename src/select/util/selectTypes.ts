import React from "react";

interface Option<Id = string> {
  id: Id;
  isDisabled?: boolean;
}

type TypeaheadSelectOption<Id = string> = Option<Id>;

type SelectItemElement = HTMLLIElement | HTMLDivElement;

type OptionSelectHandler<T extends Option = Option> = (
  option: T | null,
  event?: React.SyntheticEvent<SelectItemElement>
) => void;

type TypeaheadSelectOptionSelectHandler<
  T extends TypeaheadSelectOption = TypeaheadSelectOption
> = (option: T, event?: React.SyntheticEvent<SelectItemElement>) => void;

type SelectRole = "listbox" | "menu";
interface SelectProps<T extends Option = Option> {
  children: React.ReactNode;
  options: Option[];
  value: SelectValue<T>;
  onSelect: OptionSelectHandler<T>;
  role?: SelectRole;
  hasError?: boolean;
  customClassName?: string;
  isDisabled?: boolean;
  shouldCloseOnSelect?: boolean;
  isMenuOpen?: boolean;
  testid?: string;
}

type SelectContextValue = Pick<
  SelectProps,
  | "hasError"
  | "isDisabled"
  | "onSelect"
  | "shouldCloseOnSelect"
  | "value"
  | "role"
  | "options"
> &
  SelectOwnState;

interface SelectOwnState {
  isMenuOpen: boolean;
  focusedOptionIndex: number;
}

type SelectValue<T extends Option> = T | T[] | null;

type SelectStateAction =
  | {type: "TOGGLE_MENU_VISIBILITY"}
  | {type: "SET_FOCUSED_OPTION_INDEX"; payload: number};

export type {
  SelectContextValue,
  Option,
  SelectRole,
  OptionSelectHandler,
  SelectProps,
  SelectStateAction,
  SelectOwnState,
  SelectItemElement,
  TypeaheadSelectOption,
  TypeaheadSelectOptionSelectHandler
};
