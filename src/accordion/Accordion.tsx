import React from "react";

import AccordionItem from "./item/AccordionItem";
import {AccordionContextProvider} from "./AccordionProvider";
export type AccordionProps = {
  allowMultipleExpanded?: boolean;
  allowZeroExpanded?: boolean;
  defaultExpanded?: string[];
  children: React.ReactNode;
};

function Accordion(props: AccordionProps) {
  const {allowMultipleExpanded, allowZeroExpanded, defaultExpanded, children} = props;

  return (
    <AccordionContextProvider
      allowMultipleExpanded={allowMultipleExpanded}
      allowZeroExpanded={allowZeroExpanded}
      defaultExpanded={defaultExpanded}>
      <div>{children}</div>
    </AccordionContextProvider>
  );
}

Accordion.Body = () => <div />;
Accordion.Item = AccordionItem;

export default Accordion;
