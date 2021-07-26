import "./_tab.scss";

import React, {useState, useEffect} from "react";
import classNames from "classnames";

import TabHeaderItem from "./header/item/TabHeaderItem";
import List from "../list/List";

export type TabItem = {
  id: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

export interface TabProps {
  items: TabItem[];
  children: React.ReactNode[];
  testid?: string;
  selectedItem?: number;
  customClassName?: string;
  onTabChange?: (index: number) => void;
}

function Tab({
  testid,
  items,
  selectedItem = 0,
  children,
  customClassName,
  onTabChange
}: TabProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(selectedItem);
  const tabClassName = classNames("tab", customClassName);

  useEffect(() => {
    setActiveTabIndex(selectedItem);
  }, [selectedItem]);

  return (
    <div className={tabClassName}>
      <List testid={`${testid}.header`} customClassName={"tab__header"} items={items}>
        {(item, itemTestId, index) => (
          <TabHeaderItem
            testid={itemTestId}
            onClick={handleChangeActiveTab}
            tab={item}
            isActive={activeTabIndex === index}
            index={index!}
          />
        )}
      </List>

      <div className={"tab__body"}>{children[activeTabIndex]}</div>
    </div>
  );

  function handleChangeActiveTab(index: number) {
    if (onTabChange && index !== activeTabIndex) {
      onTabChange(index);
    }
    setActiveTabIndex(index);
  }
}

export default Tab;
