import {DropdownOption, TDropdownSelectedOption} from "../list/item/DropdownListItem";
import {DropdownPosition} from "./dropdownConstants";

function generateInitialFocusedDropdownOptionIndex(
  position: DropdownPosition,
  options: DropdownOption[],
  selectedOption: TDropdownSelectedOption<string>
) {
  const selectedOptionIndex = options.findIndex(
    (item) => item.id === (selectedOption && selectedOption.id)
  );
  let focusedOptionIndex = 0;

  if (selectedOptionIndex > -1) {
    focusedOptionIndex = selectedOptionIndex;
  } else if (position === "top") {
    focusedOptionIndex = options.length - 1;
  }

  return focusedOptionIndex;
}

function findIndexForClosestMatch(options: DropdownOption[], query: string) {
  return options.findIndex((option) =>
    option.title.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
  );
}

export {generateInitialFocusedDropdownOptionIndex, findIndexForClosestMatch};
