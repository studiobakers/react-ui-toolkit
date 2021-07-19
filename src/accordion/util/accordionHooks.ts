import {useCallback, useContext} from "react";

import {AccordionContext} from "../AccordionProvider";

/**
 * @returns {Object} Current value of AccordionContext
 */
function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Trying to consume AccordionContext outside of its provider.");
  }

  return context;
}

/**
 * @returns {function} AccordionContext's state reducer's dispatch function
 */
function useAccordion() {
  const dispatch = useAccordionContext()[1];

  return {
    /**
     * Toggles an Accordion with a given id
     */
    toggle: useCallback(
      (accordionId: string) => {
        dispatch({
          type: "TOGGLE",
          accordionId
        });
      },
      [dispatch]
    )
  };
}

export {useAccordionContext, useAccordion};
