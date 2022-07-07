import "./_select.scss";

import React, {ForwardedRef, forwardRef, Ref, useReducer} from "react";

import SelectContent from "./content/SelectContent";
import SelectGroup from "./group/SelectGroup";
import SelectItem from "./item/SelectItem";
import SelectTrigger from "./trigger/SelectTrigger";
import SelectContext, {
  initialSelectOwnState,
  selectStateReducer
} from "./util/context/SelectContext";
import useSelectClassName from "./util/hook/useSelectClassName";
import useSelectKeyDown from "./util/hook/useSelectKeyDown";
import {Option, SelectProps} from "./util/selectTypes";
import {generateSelectState} from "./util/selectUtils";
import SelectItemList from "./item-list/SelectItemList";

function SelectComponent<T extends Option = Option>(
  props: SelectProps<T>,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {children, role = "listbox", customClassName, value} = props;
  const [selectOwnState, dispatchSelectStateAction] = useReducer(
    selectStateReducer,
    initialSelectOwnState
  );
  const selectState = generateSelectState(selectOwnState, props);
  const {handleSelectKeyDown} = useSelectKeyDown(selectState, dispatchSelectStateAction);
  const selectClassName = useSelectClassName(selectState, customClassName);

  return (
    <div
      ref={ref}
      className={selectClassName}
      role={role}
      onKeyDown={handleSelectKeyDown}
      aria-multiselectable={Array.isArray(value)}>
      <SelectContext.Provider value={{selectState, dispatchSelectStateAction}}>
        {children}
      </SelectContext.Provider>
    </div>
  );
}

const Select = Object.assign(forwardRef(SelectComponent), {
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
