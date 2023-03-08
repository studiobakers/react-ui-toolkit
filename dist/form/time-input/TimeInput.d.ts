/// <reference types="react" />
import { InputProps } from "../input/util/inputTypes";
export type TimeInputProps = Omit<InputProps, "localizationOptions" | "onChange" | "value" | "type" | "name"> & {
    onChange: (timeString: string) => void;
    value: string;
    initialDateTime?: Date | null;
    name?: string;
};
declare function TimeInput({ testid, initialDateTime, value, onChange, placeholder, name, customClassName, ...rest }: TimeInputProps): JSX.Element;
export default TimeInput;
