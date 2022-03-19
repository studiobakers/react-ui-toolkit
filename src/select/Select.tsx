import "./_select.scss";

import React, {useEffect, useReducer} from "react";

import SelectContent from "./content/SelectContent";
import SelectGroup from "./group/SelectGroup";
import SelectItem from "./item/SelectItem";
import SelectTrigger from "./trigger/SelectTrigger";
import SelectContext, {
  initialSelectState,
  selectStateReducer
} from "./util/context/SelectContext";
import useSelectClassName from "./util/hook/useSelectClassName";
import useSelectKeyDown from "./util/hook/useSelectKeyDown";
import {SelectProps} from "./util/selectTypes";
import {generateSelectStateFromProps} from "./util/selectUtils";

function Select(props: SelectProps) {
  const {
    children,
    role = "menu",
    customClassName,
    onSelect,
    options,
    value,
    hasError = false,
    isDisabled = false,
    shouldCloseOnSelect = true
  } = props;
  const [selectState, dispatchSelectStateAction] = useReducer(
    selectStateReducer,
    initialSelectState
  );
  const {handleSelectKeyDown} = useSelectKeyDown(selectState, dispatchSelectStateAction);
  const selectClassName = useSelectClassName(selectState, customClassName);

  useEffect(() => {
    dispatchSelectStateAction({
      type: "SET_SELECT_STATE",
      payload: generateSelectStateFromProps(selectState, {
        onSelect,
        options,
        value,
        hasError,
        isDisabled,
        shouldCloseOnSelect
      })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div className={selectClassName} role={role} onKeyDown={handleSelectKeyDown}>
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
