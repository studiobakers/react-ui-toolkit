import {createContext, useContext} from "react";

type ToggleContextValue = {
  selectedToggleItemsState: string[];
  onToggleItem: (dataId: string) => void;
};

const ToggleContext = createContext<ToggleContextValue>({
  selectedToggleItemsState: [] as string[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onToggleItem: () => {}
});

function useToggle() {
  const toggleContext = useContext(ToggleContext);

  if (!toggleContext) {
    throw new Error("No context found for Toggle");
  }

  return toggleContext;
}

export {ToggleContext, useToggle};
