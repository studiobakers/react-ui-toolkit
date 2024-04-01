import "./_tab.scss";

import React, {useState} from "react";
import classNames from "classnames";

import TabHeaderItem from "./header/item/TabHeaderItem";
import List from "../list/List";

export type TabItem<ID extends string | number = string | number> = {
  id: ID;
  content: React.ReactNode;
  icon?: React.ReactNode;
  isDisabled?: boolean;
};

interface UncontrolledTabProps<ID extends string | number = string | number> {
  items: TabItem<ID>[];
  children: React.ReactNode[];
  testid?: string;
  initialActiveTabIndex?: number;
  customClassName?: string;
  wrapperId?: string;
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

export type TabProps = ControlledTabProps & UncontrolledTabProps<string | number>;

function Tab({
  testid,
  items,
  initialActiveTabIndex = 0,
  activeTabIndex: activeTabIndexFromProps,
  children,
  customClassName,
  onTabChange,
  wrapperId
}: TabProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);
  const tabClassName = classNames("tab", customClassName);

  return (
    <div id={wrapperId} className={tabClassName}>
      <List testid={`${testid}.header`} customClassName={"tab__header"} items={items}>
        {(item, itemTestId, index) => (
          <TabHeaderItem
            testid={itemTestId}
            onClick={handleChangeActiveTab}
            tab={item}
            isActive={
              activeTabIndexFromProps === undefined
                ? activeTabIndex === index
                : activeTabIndexFromProps === index
            }
            index={index!}
          />
        )}
      </List>

      <div className={"tab__body"} data-testid={`${testid}.body`}>
        {
          children[
            activeTabIndexFromProps === undefined
              ? activeTabIndex
              : activeTabIndexFromProps
          ]
        }
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
