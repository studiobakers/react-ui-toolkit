import "./_file-input.scss";

import React from "react";
import classNames from "classnames";

import Spinner from "../../../spinner/Spinner";

export interface FileInputProps {
  testid?: string;
  htmlFor: string;
  name: string;
  children: React.ReactNode;
  onChange: React.ReactEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isPending?: boolean;
  customClassName?: string;
  customLabelClassName?: string;
  acceptedFileTypes?: string;
  labelRef?: React.RefObject<HTMLLabelElement>;
}

function FileInput({
  onChange,
  children,
  testid,
  name,
  htmlFor,
  acceptedFileTypes = "image/png, image/jpeg, .pdf",
  customClassName,
  customLabelClassName,
  isPending,
  isDisabled,
  labelRef
}: FileInputProps) {
  const containerClassName = classNames("file-input-container", customClassName);
  const isInputDisabled = isPending || isDisabled;
  const labelClassName = classNames("file-input-label", customLabelClassName, {
    disabled: isInputDisabled
  });

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
      />

      <label
        ref={labelRef}
        htmlFor={htmlFor}
        className={labelClassName}
        data-testid={`${testid}.label`}>
        {children}

        {isPending && <Spinner customClassName={"button-spinner"} />}
      </label>
    </div>
  );
}

export default FileInput;
