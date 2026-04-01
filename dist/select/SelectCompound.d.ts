import { JSX, Ref } from "react";
import { Option, SelectProps } from "./Select";
import SelectContent from "./content/SelectContent";
import SelectGroup from "./group/SelectGroup";
import SelectItem from "./item/SelectItem";
import SelectTrigger from "./trigger/SelectTrigger";
import SelectItemList from "./item-list/SelectItemList";
declare const _default: (<T extends Option = Option>(props: SelectProps<T> & {
    ref?: Ref<HTMLDivElement> | undefined;
}) => JSX.Element) & {
    Content: typeof SelectContent;
    Group: typeof SelectGroup;
    Item: typeof SelectItem;
    Trigger: typeof SelectTrigger;
    ItemList: typeof SelectItemList;
};
export default _default;
