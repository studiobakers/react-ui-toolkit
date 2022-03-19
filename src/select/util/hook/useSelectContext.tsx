import {useContext} from "react";

import SelectContext from "../context/SelectContext";

function useSelectContext() {
  const selectContext = useContext(SelectContext);

  if (!selectContext) {
    throw new Error("useSelect must be used within a Select");
  }

  return selectContext;
}

export default useSelectContext;
