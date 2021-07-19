import React, {createContext, useReducer} from "react";

import accordionReducer from "./util/accordionReducer";
import {AccordionContextState, AccordionAction} from "./util/accordionTypes";

const AccordionContext = createContext<
  [AccordionContextState, React.Dispatch<AccordionAction>]
>([
  {
    items: {},
    allowMultipleExpanded: false,
    allowZeroExpanded: false
  },
  () => undefined
]);

AccordionContext.displayName = "AccordionContext";

interface AccordionContextProviderProps {
  allowMultipleExpanded?: boolean;
  allowZeroExpanded?: boolean;
  defaultExpanded?: string[];
  children: React.ReactNode;
}

function AccordionContextProvider({
  allowMultipleExpanded = false,
  allowZeroExpanded = false,
  defaultExpanded = [],
  children
}: AccordionContextProviderProps) {
  const items = defaultExpanded.reduce((o, key) => ({...o, [key]: true}), {});

  const [state, dispatch] = useReducer(accordionReducer, {
    allowMultipleExpanded,
    allowZeroExpanded,
    items
  });

  return (
    <AccordionContext.Provider value={[state, dispatch]}>
      {children}
    </AccordionContext.Provider>
  );
}

export {AccordionContext, AccordionContextProvider};
