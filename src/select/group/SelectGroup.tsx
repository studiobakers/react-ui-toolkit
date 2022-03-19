import classNames from "classnames";
import React from "react";

type SelectGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
  customClassName?: string;
};

function SelectGroup({children, customClassName, ...props}: SelectGroupProps) {
  return (
    <div
      className={classNames("select-group", customClassName)}
      role={"group"}
      {...props}>
      {children}
    </div>
  );
}

export default SelectGroup;
