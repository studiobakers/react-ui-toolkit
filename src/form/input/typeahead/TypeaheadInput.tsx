import React, {useEffect} from "react";
import classNames from "classnames";

import Input from "../Input";
import useDebounce from "../../../core/utils/hooks/debounce";

export interface TypeaheadInputProps {
  testid?: string;
  customClassName?: string;
  id?: string;
  name: string;
  isDisabled?: boolean;
  value?: string;
  placeholder: string;
  queryChangeDebounceTimeout?: number;
  onQueryChange: (value: string) => void;
  onFocus?: React.ReactEventHandler<HTMLInputElement>;
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  role?: string;
  children?: React.ReactNode;
  inputContainerRef?: React.RefObject<HTMLDivElement>;
  shouldResetValue?: boolean;
}

const DEFAULT_DEBOUNCE_TIMEOUT = 250;

function TypeaheadInput(props: TypeaheadInputProps) {
  const {
    testid,
    placeholder,
    name,
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
    value = "",
    queryChangeDebounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
    inputContainerRef,
    shouldResetValue
  } = props;

  const [inputValue, setInputValue] = useDebounce(
    onQueryChange,
    value,
    queryChangeDebounceTimeout
  );

  useEffect(() => {
    if (shouldResetValue) {
      setInputValue("");
    }
  }, [shouldResetValue, setInputValue]);

  return (
    <Input
      inputContainerRef={inputContainerRef}
      customClassName={classNames("typeahead-input", customClassName)}
      id={id}
      testid={testid}
      name={name}
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

export default TypeaheadInput;
