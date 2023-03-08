import { TypeaheadSelectOption } from "../../select/util/selectTypes";
import { TagShape } from "../Tag";
declare function mapOptionsToTagShapes<T extends TypeaheadSelectOption = TypeaheadSelectOption>(options: T[]): TagShape<T>[];
export { mapOptionsToTagShapes };
