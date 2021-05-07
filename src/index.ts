import "./ui/reference/_colors.scss";
import "./ui/reference/_measurement.scss";

import FormField from "./form/field/FormField";
import Input from "./form/input/Input";
import PasswordInput from "./form/password-input/PasswordInput";
import FileInput from "./form/input/file/FileInput";
import CheckboxInput from "./form/input/checkbox/CheckboxInput";
import RadioInput from "./form/input/radio/RadioInput";
import RadioGroup from "./form/input/radio/group/RadioGroup";
import TypeaheadInput from "./form/input/typeahead/TypeaheadInput";
import TypeaheadSelect from "./select/typeahead/TypeaheadSelect";
import Dropdown from "./dropdown/Dropdown";
import List from "./list/List";
import ListItem from "./list/item/ListItem";
import Button from "./button/Button";
import FileUploadButton from "./button/file-upload/FileUploadButton";
import Spinner from "./spinner/Spinner";
import Tab from "./tab/Tab";
import Textarea from "./form/textarea/Textarea";
import Avatar from "./avatar/Avatar";
import {Toggle} from "./toggle/Toggle";
import Switch from "./switch/Switch";
import Countdown from "./countdown/Countdown";
import useCountDownTimer from "./core/utils/hooks/useCountdownTimer";
import ProgressBar from "./progress-bar/ProgressBar";

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
  Dropdown,
  Avatar,
  List,
  ListItem,
  Button,
  FileUploadButton,
  Spinner,
  Tab,
  Countdown,
  ProgressBar,
  Textarea,
  Toggle,
  Switch,
  // Hooks
  useCountDownTimer
};

// Types
export type FormFieldProps = any;
export type InputProps = any;
export type FileInputProps = any;
export type PasswordInputProps = any;
export type CheckboxInputProps = any;
export type RadioInputProps = any;
export type RadioInputItem = any;
export type RadioGroupProps = any;
export type TypeaheadInputProps = any;
export type TypeaheadSelectProps = any;
export type DropdownProps = any;
export type DropdownOption = any;
export type DropdownOptionSelectHandler = any;
export type DropdownSelectedOption = any;
export type ListProps = any;
export type ButtonProps = any;
export type FileUploadButtonProps = any;
export type SpinnerProps = any;
export type TabItem = any;
export type TabProps = any;
export type AvatarProps = any;
export type ProgressBarProps = any;
export type TextareaProps = any;
export type ToggleProps = any;
export type SwitchProps = any;
export type CountdownProps = any;
