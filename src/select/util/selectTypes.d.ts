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

type OptionSelectHandler<Id = string, Context = any> = (
  option: Option<Id, Context> | null,
  event?: React.SyntheticEvent<HTMLLIElement>
) => void;

type SelectRole = "listbox" | "menu";
interface SelectProps {
  children: React.ReactNode;
  role: SelectRole;
  options: Option[];
  value: SelectValue;
  onSelect: OptionSelectHandler;
  hasError?: boolean;
  customClassName?: string;
  isDisabled?: boolean;
  shouldCloseOnSelect?: boolean;
}

type SelectState = Pick<
  SelectProps,
  | "options"
  | "hasError"
  | "isDisabled"
  | "onSelect"
  | "shouldCloseOnSelect"
  | "value"
  | "role"
> & {
  isMenuOpen: boolean;
  focusedOptionIndex: number;
};

type SelectValue = Option | Option[] | null;

type SelectStateAction =
  | {type: "TOGGLE_MENU_VISIBILITY"}
  | {type: "SET_FOCUSED_OPTION_INDEX"; payload: number}
  | {type: "SET_SELECT_STATE"; payload: SelectState};

export type {
  SelectState,
  Option,
  SelectRole,
  OptionSelectHandler,
  SelectProps,
  SelectStateAction
};
