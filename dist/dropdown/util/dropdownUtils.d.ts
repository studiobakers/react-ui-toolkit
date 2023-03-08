import { DropdownOption, DropdownSelectedOption } from "../list/item/DropdownListItem";
import { DropdownPosition } from "./dropdownConstants";
declare function generateInitialFocusedDropdownOptionIndex(position: DropdownPosition, options: DropdownOption[], selectedOption: DropdownSelectedOption<string>): number;
declare function findIndexForClosestMatch(options: DropdownOption[], query: string): number;
export { generateInitialFocusedDropdownOptionIndex, findIndexForClosestMatch };
