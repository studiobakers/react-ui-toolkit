import {useContext} from "react";

import {ToggleContext} from "../Toggle";

function useToggle() {
  return useContext(ToggleContext);
}

export {useToggle};
