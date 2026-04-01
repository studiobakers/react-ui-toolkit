import "./_tag.scss";
import { type ReactNode } from "react";
export interface TagShape<Context = any> {
    id: string;
    content: ReactNode;
    context?: Context;
}
interface TagProps {
    tag: TagShape;
    testid?: string;
    customClassName?: string;
    onRemove?: (tag: TagShape) => void;
}
declare function Tag({ testid, tag, onRemove, customClassName }: TagProps): import("react/jsx-runtime").JSX.Element;
export default Tag;
