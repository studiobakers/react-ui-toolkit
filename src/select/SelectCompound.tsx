import {JSX, Ref} from "react";

import SelectBase, {Option, SelectProps} from "./Select";
import SelectContent from "./content/SelectContent";
import SelectGroup from "./group/SelectGroup";
import SelectItem from "./item/SelectItem";
import SelectTrigger from "./trigger/SelectTrigger";
import SelectItemList from "./item-list/SelectItemList";

const Select = Object.assign(SelectBase, {
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Trigger: SelectTrigger,
  ItemList: SelectItemList
});

export default Select as (<T extends Option = Option>(
  props: SelectProps<T> & {ref?: Ref<HTMLDivElement>}
) => JSX.Element) & {
  Content: typeof SelectContent;
  Group: typeof SelectGroup;
  Item: typeof SelectItem;
  Trigger: typeof SelectTrigger;
  ItemList: typeof SelectItemList;
};
