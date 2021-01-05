import React from "react";
import classNames from "classnames";

import FileInput, {FileInputProps} from "../../form/input/file/FileInput";

export type FileUploadButtonProps = Omit<
  FileInputProps,
  "children" | "onChange" | "children"
> & {
  children: React.ReactNode;
  customClassName?: string;
  customLabelClassName?: string;
  onFileSelect?: (
    files: React.SyntheticEvent<HTMLInputElement>["currentTarget"]["files"]
  ) => void;
};

function FileUploadButton({
  onFileSelect,
  children,
  customClassName,
  customLabelClassName,
  ...fileInputProps
}: FileUploadButtonProps) {
  return (
    <FileInput
      {...fileInputProps}
      customClassName={classNames("file-upload-button", customClassName)}
      customLabelClassName={classNames(
        "file-upload-button__label",
        "button",
        customLabelClassName
      )}
      onChange={handleFileSelect}>
      {children}
    </FileInput>
  );

  function handleFileSelect(event: React.SyntheticEvent<HTMLInputElement>) {
    const {files} = event.currentTarget;

    if (onFileSelect && files?.length) {
      onFileSelect(files);
    }
  }
}

export default FileUploadButton;
