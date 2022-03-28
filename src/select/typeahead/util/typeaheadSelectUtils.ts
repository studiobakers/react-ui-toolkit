import {Option} from "../../util/selectTypes";

function filterOptionsByKeyword(options: Option[], keyword: string): Option[] {
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
