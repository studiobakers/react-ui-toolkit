import React from "react";
import { TypeaheadInputProps } from "../../form/input/typeahead/TypeaheadInput";
import { Option, TypeaheadSelectOption, TypeaheadSelectOptionSelectHandler } from "../util/selectTypes";
import "./_typeahead-select.scss";
export interface TypeaheadSelectProps<T extends TypeaheadSelectOption = TypeaheadSelectOption> {
    selectedOptions: T[];
    options: T[];
    onSelect: TypeaheadSelectOptionSelectHandler<T>;
    typeaheadProps: Pick<TypeaheadInputProps, "id" | "placeholder" | "name" | "onFocus" | "type">;
    testid?: string;
    onKeywordChange?: (value: string) => void;
    initialKeyword?: string;
    controlledKeyword?: string;
    onTagRemove?: (option: Option) => void;
    selectedOptionLimit?: number;
    customClassName?: string;
    shouldDisplaySelectedOptions?: boolean;
    shouldFilterOptionsByKeyword?: boolean;
    isDisabled?: boolean;
    customSpinner?: React.ReactNode;
    shouldShowEmptyOptions?: boolean;
    canOpenDropdownMenu?: boolean;
    areOptionsFetching?: boolean;
}
declare function TypeaheadSelect<T extends TypeaheadSelectOption = TypeaheadSelectOption>({ testid, options, selectedOptions, typeaheadProps, onTagRemove, onKeywordChange, onSelect, customClassName, selectedOptionLimit, shouldDisplaySelectedOptions, shouldFilterOptionsByKeyword, isDisabled, shouldShowEmptyOptions, canOpenDropdownMenu, areOptionsFetching, customSpinner, initialKeyword, controlledKeyword }: TypeaheadSelectProps<T>): JSX.Element;
export default TypeaheadSelect;
