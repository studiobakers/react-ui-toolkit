import classNames from "classnames";
import React, {useReducer} from "react";

import {KEYBOARD_EVENT_KEY} from "../core/utils/keyboard/keyboardEventConstants";
import SelectContent from "./content/SelectContent";
import SelectGroup from "./group/SelectGroup";
import SelectItem from "./item/SelectItem";
import SelectTrigger from "./trigger/SelectTrigger";
import SelectContext, {selectStateReducer} from "./util/context/SelectContext";
import {SelectProps} from "./util/selectTypes";

function Select<IsMulti extends boolean = false>({
  children,
  isDisabled,
  customClassName,
  role,
  hasError,
  ...contextState
}: SelectProps<IsMulti>) {
  const [selectState, dispatchSelectStateAction] = useReducer(selectStateReducer, {
    ...contextState,
    isMenuOpen: false,
    focusedOptionIndex: 0
  });
  const {
    value,
    isMenuOpen,
    focusedOptionIndex,
    isMultiSelect,
    options,
    onSelect
  } = selectState;

  const selectClassName = classNames("select", customClassName, {
    "select--is-disabled": isDisabled,
    "select--is-multi-select": isMultiSelect,
    "select--has-selected-option": value,
    "select--has-error": hasError,
    "select--is-open": isMenuOpen
  });

  return (
    <div className={selectClassName} role={role} onKeyDown={handleKeyDown}>
      <SelectContext.Provider value={{selectState, dispatchSelectStateAction}}>
        {children}
      </SelectContext.Provider>
    </div>
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const {key} = event;

    switch (key) {
      case KEYBOARD_EVENT_KEY.ESCAPE: {
        if (isMenuOpen) {
          event.stopPropagation();
          dispatchSelectStateAction({type: "TOGGLE_MENU_VISIBILITY"});
        }
        break;
      }

      case KEYBOARD_EVENT_KEY.ENTER: {
        if (isMenuOpen) {
          event.stopPropagation();
          event.preventDefault();

          if (!options[focusedOptionIndex]?.isDisabled) {
            onSelect(options[focusedOptionIndex]);
          }
        }
        break;
      }

      case KEYBOARD_EVENT_KEY.ARROW_DOWN: {
        event.stopPropagation();
        event.preventDefault();

        dispatchSelectStateAction({
          type: "SET_FOCUSED_OPTION_INDEX",
          payload: (focusedOptionIndex + 1) % options.length
        });
        break;
      }

      case KEYBOARD_EVENT_KEY.ARROW_UP: {
        event.stopPropagation();
        event.preventDefault();

        dispatchSelectStateAction({
          type: "SET_FOCUSED_OPTION_INDEX",
          payload: (focusedOptionIndex || options.length) - 1
        });
        break;
      }

      case KEYBOARD_EVENT_KEY.HOME: {
        event.stopPropagation();
        event.preventDefault();

        dispatchSelectStateAction({
          type: "SET_FOCUSED_OPTION_INDEX",
          payload: 0
        });
        break;
      }

      case KEYBOARD_EVENT_KEY.END: {
        event.stopPropagation();
        event.preventDefault();

        dispatchSelectStateAction({
          type: "SET_FOCUSED_OPTION_INDEX",
          payload: options.length - 1
        });
        break;
      }

      default:
        break;
    }
  }
}

Select.Trigger = SelectTrigger;
Select.Item = SelectItem;
Select.Content = SelectContent;
Select.Group = SelectGroup;

export default Select;
