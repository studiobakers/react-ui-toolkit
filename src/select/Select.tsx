import "./_select.scss";

import {ForwardedRef, forwardRef, useImperativeHandle, useReducer, useRef} from "react";

import useSelectClassName from "./util/hook/useSelectClassName";
import useSelectKeyDown from "./util/hook/useSelectKeyDown";
import {Option, SelectProps} from "./util/selectTypes";
import {generateSelectState} from "./util/selectUtils";
import {selectStateReducer} from "./util/context/SelectContext.reducer";
import {SelectContext, SelectDispatchContext} from "./util/context/SelectContext";
import useOnClickOutside from "../core/utils/hooks/useOnClickOutside";

function SelectComponent<T extends Option = Option>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {children, role = "listbox", customClassName, value} = props;
  const [selectOwnState, dispatchSelectStateAction] = useReducer(selectStateReducer, {
    focusedOptionIndex: -1,
    isMenuOpen: false,
    options: props.options || []
  });
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectState = generateSelectState(selectOwnState, props);
  const {handleSelectKeyDown} = useSelectKeyDown(selectState, dispatchSelectStateAction);
  const selectClassName = useSelectClassName(selectState, customClassName);

  useOnClickOutside(selectRef?.current, handleCloseMenu);

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => selectRef.current
  );

  return (
    <div
      ref={selectRef}
      className={selectClassName}
      role={role}
      onKeyDown={handleSelectKeyDown}
      aria-multiselectable={Array.isArray(value)}>
      <SelectContext.Provider value={selectState}>
        <SelectDispatchContext.Provider value={dispatchSelectStateAction}>
          {children}
        </SelectDispatchContext.Provider>
      </SelectContext.Provider>
    </div>
  );

  function handleCloseMenu() {
    if (selectOwnState.isMenuOpen) {
      dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
    }
  }
}

const SelectBase = forwardRef(SelectComponent);

export default SelectBase;

export type {Option, SelectProps};
