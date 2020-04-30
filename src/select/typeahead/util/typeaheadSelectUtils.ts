import {DropdownOption} from "../../../dropdown/list/item/DropdownListItem";

function filterOptionsByKeyword(
  options: DropdownOption[],
  keyword: string
): DropdownOption[] {
  let filteredOptions = options;

  if (keyword) {
    filteredOptions = options.filter(
      (option) =>
        !option.title || option.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return filteredOptions;
}

export {filterOptionsByKeyword};
