import React from "react";
import { SelectContextValue, SelectStateAction } from "../selectTypes";
/**
 * A hook for handle select key down event.
 * @param state - Select state
 * @param dispatch - Select state dispatch function
 * @returns {Object} - An object that contains select key down handler
 * @example
 * const {handleSelectKeyDown} = useSelectKeyDown(state, dispatch);
 * <div
 *  onKeyDown={handleSelectKeyDown}
 *  ...
 * />
 */
declare function useSelectKeyDown(state: SelectContextValue, dispatch: React.Dispatch<SelectStateAction>): {
    handleSelectKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
export default useSelectKeyDown;
