import { TypeaheadSelectOption } from "../../util/selectTypes";
declare function filterOptionsByKeyword<T extends TypeaheadSelectOption = TypeaheadSelectOption>(options: T[], keyword: string): T[];
export { filterOptionsByKeyword };
