import "./ui/reference/_colors.scss";
import "./ui/reference/_measurement.scss";

import FormField, {
  FormFieldProps as FormFieldComponentProps
} from "./form/field/FormField";
import Input from "./form/input/Input";
import {InputProps as InputComponentProps} from "./form/input/util/inputTypes";
import PasswordInput, {
  PasswordInputProps as PasswordInputComponentProps
} from "./form/password-input/PasswordInput";
import FileInput, {
  FileInputProps as FileInputComponentProps
} from "./form/input/file/FileInput";
import CheckboxInput, {
  CheckboxInputProps as CheckboxInputComponentProps
} from "./form/input/checkbox/CheckboxInput";
import RadioInput, {
  RadioInputProps as RadioInputComponentProps,
  RadioInputItem as RadioInputComponentItem
} from "./form/input/radio/RadioInput";
import RadioGroup, {
  RadioGroupProps as RadioGroupComponentProps
} from "./form/input/radio/group/RadioGroup";
import TypeaheadInput, {
  TypeaheadInputProps as TypeaheadInputComponentProps
} from "./form/input/typeahead/TypeaheadInput";
import TypeaheadSelect, {
  TypeaheadSelectProps as TypeaheadSelectComponentProps
} from "./select/typeahead/TypeaheadSelect";
import List, {ListProps as ListComponentProps} from "./list/List";
import ListItem, {ListItemProps as ListItemComponentProps} from "./list/item/ListItem";
import DescriptionTerm, {
  DescriptionTermProps as DescriptionTermComponentProps
} from "./list/description-term/DescriptionTerm";
import Button, {ButtonProps as ButtonComponentProps} from "./button/Button";
import FileUploadButton, {
  FileUploadButtonProps as FileUploadButtonComponentProps
} from "./button/file-upload/FileUploadButton";
import Spinner, {SpinnerProps as SpinnerComponentProps} from "./spinner/Spinner";
import Tab, {TabItem as TabComponentItem, TabProps as TabComponentProps} from "./tab/Tab";
import Textarea, {
  TextareaProps as TextareaComponentProps
} from "./form/textarea/Textarea";
import {Toggle, ToggleProps as ToggleComponentProps} from "./toggle/Toggle";
import Switch, {SwitchProps as SwitchComponentProps} from "./switch/Switch";
import DateTimer from "./date-timer/DateTimer";
import useDateTimer from "./core/utils/hooks/useDateTimer";
import ProgressBar, {
  ProgressBarProps as ProgressBarComponentProps
} from "./progress-bar/ProgressBar";
import TimeInput, {
  TimeInputProps as TimeInputComponentProps
} from "./form/time-input/TimeInput";
import {DateTimerProps as DateTimerComponentProps} from "./date-timer/util/dateTimerTypes";
import Toast, {ToastProps as ToastComponentProps} from "./toast/Toast";
import {useToastContextState, useToaster} from "./toast/util/toastHooks";
import {
  ToastDispatchContext,
  ToastStateContext,
  ToastContextProvider
} from "./toast/ToastProvider";
import Select from "./select/Select";
import {SelectProps as SelectComponentProps} from "./select/util/selectTypes";
import {SelectGroupProps as SelectGroupComponentProps} from "./select/group/SelectGroup";
import {SelectTriggerProps as SelectTriggerComponentProps} from "./select/trigger/SelectTrigger";
import {SelectContentProps as SelectContentComponentProps} from "./select/content/SelectContent";
import {SelectItemProps as SelectItemComponentProps} from "./select/item/SelectItem";
import useSingleSelect from "./select/util/hook/useSingleSelect";
import useMultiSelect from "./select/util/hook/useMultiSelect";

export {
  // Components
  FormField,
  Input,
  FileInput,
  PasswordInput,
  CheckboxInput,
  RadioInput,
  RadioGroup,
  TypeaheadInput,
  TypeaheadSelect,
  List,
  ListItem,
  DescriptionTerm,
  Button,
  FileUploadButton,
  Spinner,
  Tab,
  DateTimer,
  ProgressBar,
  Textarea,
  TimeInput,
  Toggle,
  Switch,
  Toast,
  Select,
  // Hooks
  useToastContextState,
  useToaster,
  useSingleSelect,
  useMultiSelect,
  useDateTimer,
  // Contexts
  ToastDispatchContext,
  ToastStateContext,
  ToastContextProvider
};

// Types
export type FormFieldProps = FormFieldComponentProps;
export type InputProps = InputComponentProps;
export type FileInputProps = FileInputComponentProps;
export type PasswordInputProps = PasswordInputComponentProps;
export type CheckboxInputProps = CheckboxInputComponentProps;
export type RadioInputProps<Id = string, Context = any> = RadioInputComponentProps<
  Id,
  Context
>;
export type RadioInputItem<Id = string, Context = any> = RadioInputComponentItem<
  Id,
  Context
>;
export type RadioGroupProps<Id = string, Context = any> = RadioGroupComponentProps<
  Id,
  Context
>;
export type TypeaheadInputProps = TypeaheadInputComponentProps;
export type TypeaheadSelectProps = TypeaheadSelectComponentProps;
export type ListProps<Item = any> = ListComponentProps<Item>;
export type ButtonProps = ButtonComponentProps;
export type DescriptionTermProps = DescriptionTermComponentProps;
export type FileUploadButtonProps = FileUploadButtonComponentProps;
export type SpinnerProps = SpinnerComponentProps;
export type TabItem = TabComponentItem;
export type TabProps = TabComponentProps;
export type ProgressBarProps = ProgressBarComponentProps;
export type TextareaProps = TextareaComponentProps;
export type ToggleProps = ToggleComponentProps;
export type SwitchProps = SwitchComponentProps;
export type TimeInputProps = TimeInputComponentProps;
export type DateTimerProps = DateTimerComponentProps;
export type ListItemProps = ListItemComponentProps;
export type ToastProps = ToastComponentProps;
export type SelectProps = SelectComponentProps;
export type SelectGroupProps = SelectGroupComponentProps;
export type SelectTriggerProps = SelectTriggerComponentProps;
export type SelectContentProps = SelectContentComponentProps;
export type SelectItemProps = SelectItemComponentProps;
