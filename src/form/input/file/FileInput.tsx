import React from "react";
import classNames from "classnames";

import Spinner from "../../../spinner/Spinner";

// SCSS import is moved here to be able to override Spinner styles without nesting
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

const FileInput = React.forwardRef<HTMLLabelElement, Record<string, any>>(
  // eslint-disable-next-line prefer-arrow-callback
  function FileInputComponent(props: FileInputProps, ref) {
    const {
      onChange,
      children,
      testid,
      name,
      htmlFor,
      acceptedFileTypes = "image/png, image/jpeg, .pdf",
      customSpinner,
      customClassName,
      customLabelClassName,
      isPending,
      isDisabled,
      isMultiple
    } = props;
    const containerClassName = classNames("file-input__container", customClassName);
    const isInputDisabled = isPending || isDisabled;
    const labelClassName = classNames("file-input__label", customLabelClassName, {
      "file-input__label--is-disabled": isInputDisabled
    });
    const spinnerContent = customSpinner || (
      <Spinner customClassName={"file-input__spinner"} />
    );

    return (
      <div className={containerClassName}>
        <input
          data-testid={testid}
          type={"file"}
          value={""}
          name={name}
          className={"file-input"}
          onChange={onChange}
          id={htmlFor}
          disabled={isInputDisabled}
          accept={acceptedFileTypes}
          multiple={isMultiple}
        />

        <label
          ref={ref}
          htmlFor={htmlFor}
          className={labelClassName}
          data-testid={`${testid}.label`}>
          {children}

          {isPending && spinnerContent}
        </label>
      </div>
    );
  }
);

export default FileInput;
