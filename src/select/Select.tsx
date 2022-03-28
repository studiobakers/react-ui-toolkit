import "./_select.scss";

import React, {useReducer} from "react";

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
import {SelectProps} from "./util/selectTypes";
import {generateSelectState} from "./util/selectUtils";

function Select(props: SelectProps) {
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

Select.Trigger = SelectTrigger;
Select.Item = SelectItem;
Select.Content = SelectContent;
Select.Group = SelectGroup;

export default Select;
