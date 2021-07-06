import "./_tab-header-item.scss";

import React from "react";
import classNames from "classnames";

import {TabItem} from "../../Tab";
import ListItem from "../../../list/item/ListItem";

type TabHeaderItemProps = {
  tab: TabItem;
  onClick: (index: number) => void;
  isActive: boolean;
  index: number;
  testid?: string;
};

function TabHeaderItem({testid, tab, onClick, index, isActive}: TabHeaderItemProps) {
  return (
    <ListItem
      customClassName={classNames("tab-header-item", {
        "tab-header-item--is-active": isActive,
        "tab-header-item--is-disabled": tab.isDisabled
      })}
      clickableListItemProps={{onClick: handleClick}}
      testid={testid}>
      {tab.icon && <span className={"tab-header-item__icon"}>{tab.icon}</span>}

      {tab.content}
    </ListItem>
  );

  function handleClick() {
    if (tab.isDisabled) return;
    onClick(index);
  }
}

export default TabHeaderItem;
