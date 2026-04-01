import React from "react";
import { FileInputProps } from "../../form/input/file/FileInput";
export type FileUploadButtonProps = Omit<FileInputProps, "onChange"> & {
    customLabelClassName?: string;
    ref?: React.RefObject<HTMLLabelElement>;
    onFileSelect?: (files: React.SyntheticEvent<HTMLInputElement>["currentTarget"]["files"]) => void;
};
declare const FileUploadButton: React.ForwardRefExoticComponent<Omit<FileUploadButtonProps, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export default FileUploadButton;
