import "./_typeahead-select-header.scss";
import React from "react";
import { TagShape } from "../../../tag/Tag";
export interface TypeaheadSelectHeaderProps {
    tags: TagShape[];
    handleTagRemove: (tag: TagShape) => void;
    customClassName?: string;
    input?: React.ReactNode;
}
declare function TypeaheadSelectHeader({ tags, customClassName, handleTagRemove, input }: TypeaheadSelectHeaderProps): JSX.Element;
export default TypeaheadSelectHeader;
