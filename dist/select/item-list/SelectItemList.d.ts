import React, { Ref } from "react";
import { Option } from "../util/selectTypes";
import { ListProps } from "../..";
export type SelectItemListProps<T extends Option = Option> = {
    options: T[];
    contentRenderer: (option: T) => React.ReactNode;
    customClassName?: string;
} & Omit<ListProps, "items" | "ref" | "children">;
declare const _default: <T extends Option = Option>(props: {
    options: T[];
    contentRenderer: (option: T) => React.ReactNode;
    customClassName?: string | undefined;
} & Omit<ListProps<any>, "items" | "ref" | "children"> & {
    ref?: React.Ref<HTMLUListElement> | undefined;
}) => JSX.Element;
export default _default;
