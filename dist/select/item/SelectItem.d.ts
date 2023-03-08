import "./_select-item.scss";
import React, { Ref } from "react";
import { SelectItemElement, Option } from "../util/selectTypes";
export interface SelectItemProps<T extends Option = Option> {
    option: T | null;
    children: React.ReactNode;
    customClassName?: string;
    onKeyDown?: (option: T | null, event: React.KeyboardEvent<SelectItemElement>) => void;
    as?: keyof Pick<JSX.IntrinsicElements, "div" | "li">;
}
declare const _default: <T extends Option = Option>(props: SelectItemProps<T> & {
    ref?: React.Ref<SelectItemElement> | undefined;
}) => JSX.Element;
export default _default;
