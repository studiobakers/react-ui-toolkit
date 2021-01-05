import "./_file-upload-button.scss";

import React from "react";
import classNames from "classnames";

import FileInput, {FileInputProps} from "../../form/input/file/FileInput";

export type FileUploadButtonProps = Omit<
  FileInputProps,
  "children" | "onChange" | "children"
> & {
  children: React.ReactNode;
  customClassName?: string;
  onFileSelect?: (
    files: React.SyntheticEvent<HTMLInputElement>["currentTarget"]["files"]
  ) => void;
};

function FileUploadButton({
  onFileSelect,
  children,
  customClassName,
  ...fileInputProps
}: FileUploadButtonProps) {
  const containerClassName = classNames("file-upload-button", customClassName);

  return (
    <FileInput
      {...fileInputProps}
      customClassName={containerClassName}
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
