import "./_accordion.scss";

import React from "react";
import classNames from "classnames";

import AccordionItem from "./item/AccordionItem";
import {AccordionContextProvider} from "./AccordionProvider";

export type AccordionProps = {
  allowMultipleExpanded?: boolean;
  allowZeroExpanded?: boolean;
  defaultExpanded?: string[];
  customClassName?: string;
  children: React.ReactNode;
};

function Accordion(props: AccordionProps) {
  const {children, customClassName, ...rest} = props;

  return (
    <AccordionContextProvider {...rest}>
      <div className={classNames("accordion", customClassName)}>{children}</div>
    </AccordionContextProvider>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
