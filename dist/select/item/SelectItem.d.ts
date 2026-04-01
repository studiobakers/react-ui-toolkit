import "./_select-item.scss";
import { type KeyboardEvent, type ReactNode, JSX, Ref } from "react";
import { SelectItemElement, Option } from "../util/selectTypes";
export interface SelectItemProps<T extends Option = Option> {
    option: T | null;
    children: ReactNode;
    customClassName?: string;
    onKeyDown?: (option: T | null, event: KeyboardEvent<SelectItemElement>) => void;
    as?: keyof Pick<JSX.IntrinsicElements, "div" | "li">;
}
declare const _default: <T extends Option = Option>(props: SelectItemProps<T> & {
    ref?: Ref<SelectItemElement> | undefined;
}) => JSX.Element;
export default _default;
