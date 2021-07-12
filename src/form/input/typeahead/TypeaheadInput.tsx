import React, {useEffect} from "react";
import classNames from "classnames";

import Input, {InputTypes} from "../Input";
import useDebounce from "../../../core/utils/hooks/debounce";

export interface TypeaheadInputProps {
  onQueryChange: (value: string) => void;
  name: string;
  placeholder: string;
  type?: Extract<InputTypes, "text" | "number">;
  value?: string;
  testid?: string;
  customClassName?: string;
  id?: string;
  isDisabled?: boolean;
  initialValue?: string;
  queryChangeDebounceTimeout?: number;
  onFocus?: React.ReactEventHandler<HTMLInputElement>;
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  role?: string;
  children?: React.ReactNode;
}

const DEFAULT_DEBOUNCE_TIMEOUT = 250;

const TypeaheadInput = React.forwardRef<HTMLInputElement, TypeaheadInputProps>(
  (props, ref) => {
    const {
      testid,
      placeholder,
      name,
      type = "text",
      customClassName,
      onFocus,
      onBlur,
      id,
      role,
      onKeyDown,
      onQueryChange,
      isDisabled = false,
      leftIcon,
      rightIcon,
      initialValue = "",
      value,
      queryChangeDebounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT
    } = props;

    const [inputValue, setInputValue] = useDebounce(
      onQueryChange,
      initialValue,
      queryChangeDebounceTimeout
    );

    useEffect(() => {
      if (typeof value === "string") {
        setInputValue(value);
      }
    }, [value, setInputValue]);

    return (
      <Input
        ref={ref}
        customClassName={classNames("typeahead-input", customClassName)}
        id={id}
        testid={testid}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        value={inputValue}
        isDisabled={isDisabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        role={role}
      />
    );

    function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
      setInputValue(event.currentTarget.value);
    }
  }
);

export default TypeaheadInput;
