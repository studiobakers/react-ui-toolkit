import React, {Fragment, useState} from "react";

function StateProvider({children, initialState}) {
  const [state, setState] = useState(initialState);

  return <Fragment>{children(state, setState)}</Fragment>;
}

export default StateProvider;
