import "./_switch.scss";
export interface SwitchProps {
    onToggle: () => void;
    isToggledOn: boolean;
    isDisabled?: boolean;
    customClassName?: string;
    testid?: string;
}
declare function Switch({ onToggle, isToggledOn, isDisabled, customClassName, testid }: SwitchProps): import("react/jsx-runtime").JSX.Element;
export default Switch;
