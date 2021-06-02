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
  ref?: React.RefObject<HTMLLabelElement>;
  onFileSelect?: (
    files: React.SyntheticEvent<HTMLInputElement>["currentTarget"]["files"]
  ) => void;
};

const FileUploadButton = React.forwardRef<HTMLLabelElement, Record<string, any>>(
  // eslint-disable-next-line prefer-arrow-callback
  function FileUploadButtonComponent(props: FileUploadButtonProps, ref) {
    const {
      onFileSelect,
      children,
      customClassName,
      customLabelClassName,
      ...fileInputProps
    } = props;

    return (
      <FileInput
        {...fileInputProps}
        ref={ref}
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
);

export default FileUploadButton;
