import {useCallback, useState} from "react";

import {Option} from "../selectTypes";

/**
 * A hook to handle default single select behavior.
 * @param initialValue - initial value of the select
 * @returns {Object} - An object with the following properties:
 *  - value: the current value of the select
 *  - handleSelect: a function that can be used to set the value of the select
 */
function useSingleSelect<T extends Option = Option>(initialValue?: T) {
  const [value, setValue] = useState<null | T>(initialValue || null);

  const handleSelect = useCallback((option: T) => {
    setValue(option);
  }, []);

  return {
    value,
    handleSelect
  };
}

export default useSingleSelect;
