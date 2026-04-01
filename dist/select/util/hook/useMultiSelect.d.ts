import { Option } from "../selectTypes";
/**
 * A hook to handle default multi select behavior.
 * @param initialValue - initial value of the select
 * @returns {Object} - An object with the following properties:
 *  - value: the current value of the select
 * - handleSelect: a function that can be used to set the value of the select with default behavior (if the value is exists,
 *  it will remove passed option from value, otherwise the option will be added to value)
 */
declare function useMultiSelect<T extends Option = Option>(initialValue?: T[]): {
    value: T[];
    handleSelect: (option: T) => void;
};
export default useMultiSelect;
