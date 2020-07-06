import "./_tab.scss";

import React, {useState} from "react";
import classNames from "classnames";

import Button from "../button/Button";

export type TabItem = {
  id: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

interface TabProps {
  items: TabItem[];
  children: React.ReactNode[];
  customClassName?: string;
}

function Tab({items, children, customClassName}: TabProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabClassName = classNames("tab", customClassName);

  return (
    <div className={tabClassName}>
      <header className={"tab-header"}>
        {items.map((item, index) => (
          <Button
            key={item.id}
            customClassName={"tab-header-item"}
            onClick={handleChangeActiveTab(index)}>
            {item.icon && <span className={"tab-header-item-icon"}>{item.icon}</span>}

            {item.children}
          </Button>
        ))}
      </header>

      <div className={"tab-body"}>{children[activeTabIndex]}</div>
    </div>
  );

  function handleChangeActiveTab(index: number) {
    return () => setActiveTabIndex(index);
  }
}

export default Tab;
