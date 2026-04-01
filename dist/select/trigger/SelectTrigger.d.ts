import React from "react";
import { ButtonProps } from "../../button/Button";
import "./_select-trigger.scss";
export type SelectTriggerProps = Omit<ButtonProps, "type">;
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export default SelectTrigger;
