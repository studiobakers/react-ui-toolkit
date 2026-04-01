import { Option } from "../selectTypes";
/**
 * A hook to handle default single select behavior.
 * @param initialValue - initial value of the select
 * @returns {Object} - An object with the following properties:
 *  - value: the current value of the select
 *  - handleSelect: a function that can be used to set the value of the select
 */
declare function useSingleSelect<T extends Option = Option>(initialValue?: T): {
    value: T | null;
    handleSelect: (option: T | null) => void;
};
export default useSingleSelect;
