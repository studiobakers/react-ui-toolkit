import "./_accordion-item.scss";

import CaretDownIcon from "../../ui/icons/caret-down.svg";

import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames";

import {useAccordionContext, useAccordion} from "../util/accordionHooks";
import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";

export interface AccordionItemProps {
  accordionId: string;
  header: string;
  children: React.ReactNode;
}
function AccordionItem({accordionId, header, children}: AccordionItemProps) {
  const [state] = useAccordionContext();
  const accordion = useAccordion();

  const isOpen = state.items[accordionId];

  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        <span
          className={classNames("accordion__header-icon", {
            "accordion__header-icon--is-open": isOpen
          })}>
          <CaretDownIcon />
        </span>
        {header}
      </div>

      <div
        aria-expanded={isOpen}
        className={classNames("accordion__content-wrap", {
          "accordion__content-wrap--is-collapsed": !isOpen
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
    if (e.key === KEYBOARD_EVENT_KEY.ENTER) {
      handleClick();
    }
  }
}

export default AccordionItem;
