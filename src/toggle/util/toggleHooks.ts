import {useContext} from "react";

import {ToggleContext} from "../Toggle";

/**
 * @returns {Object} Current value of ToggleContext
 */
function useToggleContext() {
  return useContext(ToggleContext);
}

export {useToggleContext};
