import { SelectOwnState, SelectProps, SelectContextValue } from "./selectTypes";
/**
 * Generates select state from provided props.
 * @param {SelectContextValue} state - The current state of the select
 * @param props - The props passed to the select
 * @returns {SelectContextValue} - The new state of the select
 */
declare function generateSelectState(state: SelectOwnState, props: SelectProps): SelectContextValue;
export { generateSelectState };
