import {TypeaheadSelectOption} from "../../select/util/selectTypes";
import {TagShape} from "../Tag";

function mapOptionToTagShape<T extends TypeaheadSelectOption = TypeaheadSelectOption>(
  option: T
): TagShape<T> {
  return {
    id: option.id,
    content: option.title,
    context: option
  };
}

function mapOptionsToTagShapes<T extends TypeaheadSelectOption = TypeaheadSelectOption>(
  options: T[]
) {
  return options.map(mapOptionToTagShape);
}

export {mapOptionsToTagShapes};
