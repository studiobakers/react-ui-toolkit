import {DropdownOption} from "../list/item/DropdownListItem";

export type DropdownPosition = "top" | "right" | "bottom" | "left";

const DROPDOWN_ALL_OPTION_ID = "all";
const DROPDOWN_DESELECT_OPTION = "DROPDOWN_DESELECT_OPTION";
const DESELECT_OPTION: DropdownOption = {
  id: DROPDOWN_DESELECT_OPTION,
  title: ""
};
const DROPDOWN_SEARCH_QUERY_TIMEOUT_IN_MS = 500;

export {
  DROPDOWN_ALL_OPTION_ID,
  DROPDOWN_DESELECT_OPTION,
  DESELECT_OPTION,
  DROPDOWN_SEARCH_QUERY_TIMEOUT_IN_MS
};
