import "./_tag.scss";
import React from "react";
export interface TagShape<Context = any> {
    id: string;
    content: React.ReactNode;
    context?: Context;
}
interface TagProps {
    tag: TagShape;
    testid?: string;
    customClassName?: string;
    onRemove?: (tag: TagShape) => void;
}
declare function Tag({ testid, tag, onRemove, customClassName }: TagProps): JSX.Element;
export default Tag;
