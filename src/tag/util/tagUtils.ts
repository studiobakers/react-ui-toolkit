import {Option} from "../../select/util/selectTypes";
import {TagShape} from "../Tag";

function mapDropdownOptionToTagShape(option: Option): TagShape<Option> {
  return {
    id: option.id,
    content: option.title,
    context: option
  };
}

function mapDropdownOptionsToTagShapes(options: Option[]) {
  return options.map(mapDropdownOptionToTagShape);
}

export {mapDropdownOptionsToTagShapes};
