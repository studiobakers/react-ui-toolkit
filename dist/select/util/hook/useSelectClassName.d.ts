import { SelectContextValue } from "../selectTypes";
/**
 * A hook that returns the class name for the select component.
 * @param state - Select state
 * @param customClassName - Custom class name
 * @returns {string} - Select container className according to the provided state object
 * @example
 * const selectClassName = useSelectClassName(state, customClassName);
 * <div className={selectClassName} ... />
 */
declare function useSelectClassName(state: SelectContextValue, customClassName?: string): string;
export default useSelectClassName;
