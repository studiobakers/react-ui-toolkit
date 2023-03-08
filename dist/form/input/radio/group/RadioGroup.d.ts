/// <reference types="react" />
import "./_radio-group.scss";
import { RadioInputItem, RadioInputSelectHandler } from "../RadioInput";
export interface RadioGroupProps<Id = string, Context = any> {
    items: RadioInputItem<Id, Context>[];
    selectedItem: null | RadioInputItem<Id, Context>;
    onSelect: RadioInputSelectHandler<Id, Context>;
    customClassName?: string;
    isDisabled?: boolean;
    testid?: string;
}
declare function RadioGroup<Id = string, Context = any>({ items, testid, onSelect, selectedItem, customClassName, isDisabled }: RadioGroupProps<Id, Context>): JSX.Element;
export default RadioGroup;
