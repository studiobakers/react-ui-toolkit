import React from "react";
import classNames from "classnames";

import {TabItem} from "../../Tab";
import Button from "../../../button/Button";

type TabHeaderItemProps = Omit<TabItem, "id"> & {
  index: number;
  onClick: (index: number) => void;
  isActive: boolean;
};

function TabHeaderItem({children, icon, index, onClick, isActive}: TabHeaderItemProps) {
  return (
    <Button
      customClassName={classNames("tab-header-item", {
        "tab-header-item--active": isActive
      })}
      onClick={handleClick}
      testid={`tab-header-item-${index}`}>
      {icon && <span className={"tab-header-item__icon"}>{icon}</span>}

      {children}
    </Button>
  );

  function handleClick() {
    onClick(index);
  }
}

export default TabHeaderItem;
