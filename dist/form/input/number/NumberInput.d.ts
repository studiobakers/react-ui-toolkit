import React from "react";
declare const NumberInput: React.ForwardRefExoticComponent<Omit<import("../util/inputTypes").InputProps, "type"> & {
    formatProps?: import("./util/numberInputTypes").NumberInputFormatProps | undefined;
    maximumFractionDigits?: number | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export default NumberInput;
