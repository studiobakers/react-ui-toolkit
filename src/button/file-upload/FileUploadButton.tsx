import "./_file-upload-button.scss";

import React from "react";
import FileInput, {FileInputProps} from "../../form/input/file/FileInput";

interface FileUploadButtonProps {
  fileInputProps: Omit<FileInputProps, "children" | "onChange"> & {children?: never};
  children: React.ReactNode;
  onFileSelect?: (
    files: React.SyntheticEvent<HTMLInputElement>["currentTarget"]["files"]
  ) => void;
}

function FileUploadButton({
  fileInputProps,
  onFileSelect,
  children
}: FileUploadButtonProps) {
  return (
    <FileInput
      {...fileInputProps}
      customClassName={"file-upload-button"}
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
