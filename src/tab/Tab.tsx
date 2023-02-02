import "./_tab.scss";

import React, {useState} from "react";
import classNames from "classnames";

import TabHeaderItem from "./header/item/TabHeaderItem";
import List from "../list/List";

export type TabItem = {
  id: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  isDisabled?: boolean;
};

interface UncontrolledTabProps {
  items: TabItem[];
  children: React.ReactNode[];
  testid?: string;
  initialActiveTabIndex?: number;
  customClassName?: string;
}

// if one of the controlled tab props are present
// other controlled tab prop is required
// and initialActiveTabIndex should be undefined
type ControlledTabProps =
  | {
      activeTabIndex: number;
      onTabChange: (index: number) => void;
      initialActiveTabIndex?: number;
    }
  | {
      activeTabIndex?: number;
      onTabChange?: (index: number) => void;
    };

export type TabProps = ControlledTabProps & UncontrolledTabProps;

function Tab({
  testid,
  items,
  initialActiveTabIndex = 0,
  activeTabIndex: activeTabIndexFromProps,
  children,
  customClassName,
  onTabChange
}: TabProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);
  const tabClassName = classNames("tab", customClassName);

  let activeTabIndexToUse = activeTabIndexFromProps || activeTabIndex;
  
  /**
   * In case activeTabIndex is out of bounds, we need to reset it to 0.
   * This can happen if items are changes after the mount
   */
  if (activeTabIndexToUse > items.length) {
    activeTabIndexToUse = 0;
  }

  return (
    <div className={tabClassName}>
      <List testid={`${testid}.header`} customClassName={"tab__header"} items={items}>
        {(item, itemTestId, index) => (
          <TabHeaderItem
            testid={itemTestId}
            onClick={handleChangeActiveTab}
            tab={item}
            isActive={activeTabIndexToUse === index}
            index={index!}
          />
        )}
      </List>

      <div className={"tab__body"} data-testid={`${testid}.body`}>
        {children[activeTabIndexToUse]}
      </div>
    </div>
  );

  function handleChangeActiveTab(index: number) {
    if (onTabChange && index !== activeTabIndexFromProps) {
      onTabChange(index);
    }

    if (activeTabIndexFromProps === undefined) {
      setActiveTabIndex(index);
    }
  }
}

export default Tab;
