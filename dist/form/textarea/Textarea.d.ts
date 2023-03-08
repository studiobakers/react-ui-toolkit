import "./_textarea.scss";
import React from "react";
import { TextareaAutosizeProps } from "react-textarea-autosize";
export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "onChange" | "className"> & {
    name: string;
    onChange: React.ReactEventHandler<HTMLTextAreaElement>;
    value?: string;
    testid?: string;
    isDisabled?: boolean;
    customClassNames?: {
        container?: string;
        textarea?: string;
    };
    style?: React.CSSProperties;
    autoSizeProps?: TextareaAutosizeProps;
    onJustEnterPressed?: () => void;
    onShiftEnter?: () => void;
    isRequired?: boolean;
    hasError?: boolean;
};
declare function Textarea(props: TextareaProps): JSX.Element;
export default Textarea;
