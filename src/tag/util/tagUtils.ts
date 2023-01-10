import React from "react";

import {TypeaheadSelectOption} from "../../select/util/selectTypes";
import {TagShape} from "../Tag";

function mapOptionToTagShape<T extends TypeaheadSelectOption = TypeaheadSelectOption>(
  option: T,
  content: React.ReactNode
): TagShape<T> {
  return {
    id: option.id,
    content,
    context: option
  };
}

function mapOptionsToTagShapes<T extends TypeaheadSelectOption = TypeaheadSelectOption>(
  options: T[],
  contentRenderer: (option: T) => React.ReactNode
) {
  return options.map((option) => mapOptionToTagShape(option, contentRenderer(option)));
}

export {mapOptionsToTagShapes};
