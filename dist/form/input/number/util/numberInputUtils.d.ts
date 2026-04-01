import React from "react";
import { ParseNumberOptions } from "../../../../core/utils/number/numberTypes";
import { NumberInputFormatProps, NumberInputLocaleProps } from "./numberInputTypes";
declare function getNumberInputFormatProps(formatProps: NumberInputFormatProps): {
    LOCALE_NEGATIVE_ZERO: string;
    LOCALE_NEGATIVE_DOUBLE_ZERO: string;
    DEFAULT_NEGATIVE_ZERO: string;
    DEFAULT_NEGATIVE_DOUBLE_ZERO: string;
    THOUSANDTHS_SEPARATOR: string;
    DECIMAL_NUMBER_SEPARATOR: string;
    MINUS_SIGN: string;
    locale?: string | undefined;
    shouldFormatToLocaleString?: boolean | undefined;
} | {
    locale: undefined;
    shouldFormatToLocaleString: boolean;
    DECIMAL_NUMBER_SEPARATOR: undefined;
    MINUS_SIGN: undefined;
    LOCALE_NEGATIVE_ZERO: undefined;
};
declare function getNumberInputParseNumberOptions(options: ParseNumberOptions): ParseNumberOptions;
declare function isNumberInputValueNotAValidNumber({ eventValue, formattedValue }: {
    eventValue: string;
    formattedValue: string;
}): boolean;
declare function getIsValidNumberInputMaxFractionDigits({ maximumFractionDigits }: {
    maximumFractionDigits: number;
}): boolean;
declare function localizeNumberInputValue({ value, formatProps, signProps, maximumFractionDigits }: {
    value: React.InputHTMLAttributes<HTMLInputElement>["value"];
    formatProps: NumberInputFormatProps;
    signProps: NumberInputLocaleProps;
    maximumFractionDigits: number;
}): string | number | readonly string[] | undefined;
declare function delocalizeNumberInputValue({ value, event, formatProps, parseNumberOptions, maximumFractionDigits }: {
    value: React.InputHTMLAttributes<HTMLInputElement>["value"];
    event: React.SyntheticEvent<HTMLInputElement>;
    formatProps: NumberInputFormatProps;
    parseNumberOptions: ParseNumberOptions;
    maximumFractionDigits: number;
}): string;
export { getNumberInputFormatProps, getNumberInputParseNumberOptions, getIsValidNumberInputMaxFractionDigits, isNumberInputValueNotAValidNumber, localizeNumberInputValue, delocalizeNumberInputValue };
