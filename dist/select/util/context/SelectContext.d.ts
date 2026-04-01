import { Dispatch } from "react";
import { SelectContextValue, SelectStateAction } from "../selectTypes";
declare const SelectContext: import("react").Context<SelectContextValue | null>;
declare const SelectDispatchContext: import("react").Context<Dispatch<SelectStateAction> | null>;
declare function useSelectContext(): SelectContextValue;
declare function useSelectDispatchContext(): Dispatch<SelectStateAction>;
export { useSelectContext, useSelectDispatchContext, SelectContext, SelectDispatchContext };
