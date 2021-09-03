import React, {Fragment, useState} from "react";

interface StateProviderProps<State> {
  children: (
    state: State,
    dispatch: React.Dispatch<React.SetStateAction<State>>
  ) => React.ReactNode;
  initialState: State;
}

function StateProvider<State extends Record<string, any>>({
  children,
  initialState
}: StateProviderProps<State>) {
  const [state, setState] = useState(initialState);

  return <Fragment>{children(state, setState)}</Fragment>;
}

export default StateProvider;
