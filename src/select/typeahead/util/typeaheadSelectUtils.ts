import {TypeaheadSelectOption} from "../../util/selectTypes";

function filterOptionsByKeyword<T extends TypeaheadSelectOption = TypeaheadSelectOption>(
  options: T[],
  keyword: string
): T[] {
  let filteredOptions = options;

  if (keyword) {
    filteredOptions = options.filter(
      (option) =>
        typeof option.title === "string" &&
        option.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return filteredOptions;
}

export {filterOptionsByKeyword};
