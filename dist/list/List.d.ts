import "./_list.scss";
import React, { Ref } from "react";
export interface ListProps<Item = any> {
    items: Item[];
    children: (item: Item, testid: string, index?: number) => JSX.Element;
    listItemKeyGenerator?: (item: Item, testid: string) => string;
    testid?: string;
    role?: string;
    customClassName?: string;
    placeholderProps?: {
        shouldDisplayPlaceholder: boolean;
        placeholder: React.ReactNode;
    };
    emptyStateProps?: {
        shouldDisplayEmptyState: boolean;
        emptyState: React.ReactNode;
    };
    type?: "unordered" | "ordered" | "description";
}
export type ListElementType = Extract<keyof JSX.IntrinsicElements, "ul" | "ol" | "dl">;
declare const _default: <Item = any>(props: ListProps<Item> & {
    ref?: React.Ref<ListElementType> | undefined;
}) => JSX.Element;
export default _default;
