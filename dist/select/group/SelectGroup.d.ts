import React from "react";
export type SelectGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
    customClassName?: string;
};
declare const SelectGroup: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
    customClassName?: string | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default SelectGroup;
