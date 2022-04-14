import React from "react";

interface Option<Id = string, Context = any> {
  id: Id;
  title: string;
  customClassName?: string;
  CustomContent?: JSX.Element;
  icon?: React.ReactNode;
  subtitle?: string;
  context?: Context;
  isDisabled?: boolean;
}

type SelectItemElement = HTMLLIElement | HTMLDivElement;

type OptionSelectHandler<Id = string, Context = any> = (
  option: Option<Id, Context> | null,
  event?: React.SyntheticEvent<SelectItemElement>
) => void;

type SelectRole = "listbox" | "menu";
interface SelectProps {
  children: React.ReactNode;
  role: SelectRole;
  value: SelectValue;
  onSelect: OptionSelectHandler;
  hasError?: boolean;
  customClassName?: string;
  isDisabled?: boolean;
  shouldCloseOnSelect?: boolean;
  isMenuOpen?: boolean;
}

type SelectState = Pick<
  SelectProps,
  "hasError" | "isDisabled" | "onSelect" | "shouldCloseOnSelect" | "value" | "role"
> &
  SelectOwnState;

interface SelectOwnState {
  isMenuOpen: boolean;
  focusedOptionIndex: number;
  options: Option[];
}

type SelectValue = Option | Option[] | null;

type SelectStateAction =
  | {type: "TOGGLE_MENU_VISIBILITY"}
  | {type: "SET_FOCUSED_OPTION_INDEX"; payload: number}
  | {type: "ADD_OPTION"; payload: Option};

export type {
  SelectState,
  Option,
  SelectRole,
  OptionSelectHandler,
  SelectProps,
  SelectStateAction,
  SelectOwnState,
  SelectItemElement
};
