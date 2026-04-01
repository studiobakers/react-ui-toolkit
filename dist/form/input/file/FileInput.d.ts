import React from "react";
import "./_file-input.scss";
export interface FileInputProps {
    htmlFor: string;
    name: string;
    children: React.ReactNode;
    onChange: React.ReactEventHandler<HTMLInputElement>;
    testid?: string;
    isDisabled?: boolean;
    isPending?: boolean;
    customSpinner?: React.ReactNode;
    customClassName?: string;
    customLabelClassName?: string;
    acceptedFileTypes?: string;
    ref?: React.RefObject<HTMLLabelElement>;
    isMultiple?: boolean;
}
declare const FileInput: React.ForwardRefExoticComponent<Omit<FileInputProps, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export default FileInput;
