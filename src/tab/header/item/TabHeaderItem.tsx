import React from "react";

import {TabItem} from "../../Tab";
import Button from "../../../button/Button";

type TabHeaderItemProps = Omit<TabItem, "id"> & {
  index: number;
  onClick: (index: number) => void;
};

function TabHeaderItem({children, icon, index, onClick}: TabHeaderItemProps) {
  return (
    <Button
      customClassName={"tab-header-item"}
      onClick={handleClick}
      testid={`tab-header-item-${index}`}>
      {icon && <span className={"tab-header-item-icon"}>{icon}</span>}

      {children}
    </Button>
  );

  function handleClick() {
    onClick(index);
  }
}

export default TabHeaderItem;
