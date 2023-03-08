/// <reference types="react" />
type ToggleContextValue = {
    selectedItems: string[];
    onToggle: (selectedItems: string[]) => void;
    canSelectMultiple?: boolean;
};
declare const ToggleContext: import("react").Context<ToggleContextValue>;
declare function useToggle(): ToggleContextValue;
export { ToggleContext, useToggle };
