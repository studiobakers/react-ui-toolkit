import classNames from "classnames";
import React from "react";

export type SelectGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
  customClassName?: string;
};

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  // eslint-disable-next-line prefer-arrow-callback
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
);

export default SelectGroup;
