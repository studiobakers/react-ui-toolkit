import classNames from "classnames";
import React, {useState, useRef, useEffect} from "react";

import "./_accordion-item.scss";

import {useAccordionContext, useAccordion} from "../util/accordionHooks";

export interface AccordionProps {
  accordionId: string;
  header: string;
  children: React.ReactNode;
}
function AccordionItem({accordionId, header, children}: AccordionProps) {
  const [state] = useAccordionContext();
  const accordion = useAccordion();

  const isOpen = state.items[accordionId];

  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(ref.current?.getBoundingClientRect().height);
    setHeight(isOpen ? ref.current?.getBoundingClientRect().height : 0);
  }, [isOpen]);

  return (
    <div className={"accordion__item"}>
      <div
        role={"button"}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        className={"accordion__header"}>
        {isOpen ? "- " : "+ "}
        {header}
      </div>
      <div
        aria-expanded={isOpen}
        className={classNames("accordion__content-wrap", {
          "accordion__content-wrap--collapsed": !isOpen
        })}
        style={{height}}>
        <div ref={ref} className={"accordion__content"}>
          {children}
        </div>
      </div>
    </div>
  );

  function handleClick() {
    accordion.toggle(accordionId);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      handleClick();
    }
  }
}

export default AccordionItem;
