import {DropdownOption} from "./../../dropdown/list/item/DropdownListItem";
import {TagShape} from "../Tag";

function mapDropdownOptionToTagShape(option: DropdownOption): TagShape<DropdownOption> {
  return {
    id: option.id,
    content: option.title,
    context: option
  };
}

function mapDropdownOptionsToTagShapes(options: DropdownOption[]) {
  return options.map(mapDropdownOptionToTagShape);
}

export {mapDropdownOptionsToTagShapes};
