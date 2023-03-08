import "./_typehead-select-trigger.scss";
import React from "react";
import { TagShape } from "../../../tag/Tag";
export interface TypeheadSelectTriggerProps {
    tags: TagShape[];
    handleTagRemove: (tag: TagShape) => void;
    customClassName?: string;
    input?: React.ReactNode;
}
declare function TypeheadSelectTrigger({ handleTagRemove, tags, customClassName, input }: TypeheadSelectTriggerProps): JSX.Element;
export default TypeheadSelectTrigger;
