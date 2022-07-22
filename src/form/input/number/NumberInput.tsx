import React from "react";

import Input from "../Input";
import {NumberInputProps} from "./util/numberInputTypes";
import {
  delocalizeNumberInputValue,
  getIsValidNumberInputMaxFractionDigits,
  localizeNumberInputValue
} from "./util/numberInputUtils";

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const {
    formatProps = {},
    maximumFractionDigits = 0,
    value,
    onChange,
    inputMode = "decimal",
    ...rest
  } = props;

  if (!getIsValidNumberInputMaxFractionDigits({maximumFractionDigits})) {
    throw new Error("maximumFractionDigits should be zero or a positive integer.");
  }

  const finalValue = localizeNumberInputValue({
    value,
    formatProps,
    maximumFractionDigits
  });

  return (
    <Input ref={ref} type={"text"} onChange={handleChange} value={finalValue} {...rest} />
  );

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (event.currentTarget.value) {
      event.currentTarget.value = delocalizeNumberInputValue({
        value,
        event,
        formatProps,
        maximumFractionDigits
      });
    }

    onChange(event);
  }
});

export default NumberInput;
