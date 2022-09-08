import React from "react";

interface Option {
  id: string;
  isDisabled?: boolean;
}

interface TypeaheadSelectOption extends Option {
  title: string;
}

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
  options: (Option | null)[];
  value: SelectValue<T>;
  onSelect: OptionSelectHandler<T>;
  role?: SelectRole;
  hasError?: boolean;
  customClassName?: string;
  isDisabled?: boolean;
  shouldCloseOnSelect?: boolean;
  isMenuOpen?: boolean;
}

type SelectContextValue = Pick<
  SelectProps,
  "hasError" | "isDisabled" | "onSelect" | "shouldCloseOnSelect" | "value" | "role"
> &
  SelectOwnState;

interface SelectOwnState {
  isMenuOpen: boolean;
  focusedOptionIndex: number;
  options: (Option | null)[];
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
