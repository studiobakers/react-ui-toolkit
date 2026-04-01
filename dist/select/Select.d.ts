/// <reference types="react" />
import "./_select.scss";
import { Option, SelectProps } from "./util/selectTypes";
declare const SelectBase: import("react").ForwardRefExoticComponent<SelectProps<Option> & import("react").RefAttributes<HTMLDivElement>>;
export default SelectBase;
export type { Option, SelectProps };
