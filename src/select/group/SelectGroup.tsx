import classNames from "classnames";
import React, {forwardRef} from "react";

export type SelectGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
  customClassName?: string;
};

function SelectGroupComponent(
  {children, customClassName, ...props}: SelectGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={classNames("select-group", customClassName)}
      role={"group"}
      {...props}>
      {children}
    </div>
  );
}

const SelectGroup = forwardRef(SelectGroupComponent);

export default SelectGroup;
