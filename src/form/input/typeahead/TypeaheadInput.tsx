import React, {useEffect} from "react";
import classNames from "classnames";

import Input, {InputProps, InputTypes} from "../Input";
import useDebounce from "../../../core/utils/hooks/debounce";

export type TypeaheadInputProps = Omit<
  InputProps,
  "onChange" | "type" | "customClassName" | "value"
> & {
  onQueryChange: (value: string) => void;
  type?: Extract<InputTypes, "text" | "number">;
  value?: string;
  initialValue?: string;
  queryChangeDebounceTimeout?: number;
  customClassName?: string;
};

const DEFAULT_DEBOUNCE_TIMEOUT = 250;

function TypeaheadInput({
  onQueryChange,
  value,
  initialValue = "",
  queryChangeDebounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
  customClassName,
  ...otherProps
}: TypeaheadInputProps) {
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
      value={inputValue}
      customClassName={classNames("typeahead-input", customClassName)}
      onChange={handleInputChange}
      {...otherProps}
    />
  );

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }
}

export default TypeaheadInput;
