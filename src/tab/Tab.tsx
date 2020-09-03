import "./_tab.scss";

import React, {useState} from "react";
import classNames from "classnames";

import TabHeaderItem from "./header/item/TabHeaderItem";

export type TabItem = {
  id: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export interface TabProps {
  items: TabItem[];
  initialActiveTabIndex?: number;
  children: React.ReactNode[];
  customClassName?: string;
}

function Tab({items, initialActiveTabIndex = 0, children, customClassName}: TabProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);
  const tabClassName = classNames("tab", customClassName);

  return (
    <div className={tabClassName}>
      <header className={"tab-header"}>
        {items.map((item, index) => (
          <TabHeaderItem
            key={item.id}
            onClick={handleChangeActiveTab}
            icon={item.icon}
            index={index}>
            {item.children}
          </TabHeaderItem>
        ))}
      </header>

      <div className={"tab-body"}>{children[activeTabIndex]}</div>
    </div>
  );

  function handleChangeActiveTab(index: number) {
    setActiveTabIndex(index);
  }
}

export default Tab;
