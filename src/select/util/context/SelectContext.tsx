import {createContext, Dispatch, useContext} from "react";

import {SelectContextValue, SelectStateAction} from "../selectTypes";

const SelectContext = createContext<null | SelectContextValue>(null);
const SelectDispatchContext = createContext<null | Dispatch<SelectStateAction>>(null);

SelectContext.displayName = "SelectContext";

function useSelectContext() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      "You can only use SelectContext within a component tree that is rooted with SelectContext.Provider."
    );
  }

  return context;
}

function useSelectDispatchContext() {
  const dispatch = useContext(SelectDispatchContext);

  if (!dispatch) {
    throw new Error(
      "You can only use SelectDispatchContext within a component tree that is rooted with SelectDispatchContext.Provider."
    );
  }

  return dispatch;
}

export {useSelectContext, useSelectDispatchContext, SelectContext, SelectDispatchContext};
