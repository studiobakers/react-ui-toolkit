import {TypeaheadSelectOption} from "../../src/select/util/selectTypes";

function filterOptionsByKeyword<T extends TypeaheadSelectOption = TypeaheadSelectOption>(
  options: T[],
  keyword: string,
  filterBy: keyof Pick<T, "id"> | "title"
): T[] {
  let filteredOptions = options;

  if (keyword) {
    filteredOptions = options.filter((option) => {
      const optionFilterValue = option[filterBy] as string;

      return optionFilterValue.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  return filteredOptions;
}

export {filterOptionsByKeyword};
