import {createContext, useContext} from "react";

type ToggleContextValue = {
  selectedItems: string[];
  onToggle: (dataId: string) => void;
};

const ToggleContext = createContext<ToggleContextValue>({
  selectedItems: [] as string[],
  onToggle: () => {}
});

ToggleContext.displayName = "ToggleContext";

function useToggle() {
  const toggleContext = useContext(ToggleContext);

  if (!toggleContext) {
    throw new Error("No context found for Toggle");
  }

  return toggleContext;
}

export {ToggleContext, useToggle};
