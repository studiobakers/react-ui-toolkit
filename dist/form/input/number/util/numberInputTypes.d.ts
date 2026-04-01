import { InputProps } from "../../util/inputTypes";
export type NumberInputFormatProps = {
    locale?: string;
    shouldFormatToLocaleString?: boolean;
};
export type NumberInputLocaleProps = {
    decimalSeparatorForLocale?: string;
    minusSignForLocale?: string;
    negativeZeroForLocale?: string;
};
export type NumberInputProps = Omit<InputProps, "type"> & {
    formatProps?: NumberInputFormatProps;
    maximumFractionDigits?: number;
};
