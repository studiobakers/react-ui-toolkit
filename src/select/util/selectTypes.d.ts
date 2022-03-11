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

type SelectedOption<Id = string, Context = any> = Option<Id, Context> | null | undefined;

type SelectRole = "listbox" | "menu";

// interface SelectState {
//   options: Option[];
//   onSelect: (option: Option) => void;
//   isMultiSelect?: boolean;
//   isMenuOpen: boolean;
//   focusedOptionIndex: number;
//   value: Option;
//   // isMenuOpenHook?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
// }

// TODO: isMenuOpen hook
// type SelectProps = Omit<SelectState, "isMenuOpen" | "focusedOptionIndex"> & {
//   children: React.ReactNode;
//   role: SelectRole;
//   areOptionsFetching?: boolean;
//   customClassName?: string;
//   isDisabled?: boolean;
//   hasError?: boolean;
//   // isMenuOpenHook?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
// };

interface SelectState<IsMulti extends boolean = true> {
  options: Option[];
  onSelect: (option: Option) => void;
  isMultiSelect?: boolean;
  isMenuOpen: boolean;
  focusedOptionIndex: number;
  value: SelectValue<IsMulti>;
  // isMenuOpenHook?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

type SelectProps<IsMulti extends boolean> = {
  children: React.ReactNode;
  role: SelectRole;
  options: Option[];
  value: SelectValue<IsMulti>;
  isMultiSelect: IsMulti;
  onSelect: (option: Option) => void;
  hasError?: boolean;
  customClassName?: string;
  isDisabled?: boolean;
};

type SelectValue<IsMulti extends boolean> = IsMulti extends true
  ? Option[]
  : Option | null;

type SelectStateAction =
  | {type: "TOGGLE_MENU_VISIBILITY"}
  | {type: "SET_FOCUSED_OPTION_INDEX"; payload: number};

export type {
  SelectState,
  Option,
  SelectRole,
  OptionSelectHandler,
  SelectedOption,
  SelectProps,
  SelectStateAction
};
