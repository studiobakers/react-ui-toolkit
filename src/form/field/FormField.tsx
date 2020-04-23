import React from "react";
import classNames from "classnames";

interface FormFieldProps {
  children: React.ReactNode;
  labelledBy?: string;
  label?: string;
  className?: string;
  // TODO: helperMessage and errorMessage should be array of string
  helperMessage?: string;
  errorMessage?: string;
}

function FormField(props: FormFieldProps) {
  const {labelledBy, label, className, children, errorMessage, helperMessage} = props;
  const hasErrorMessage = Boolean(errorMessage);
  const hasHelperMessage = Boolean(helperMessage);
  const formFieldClassName = classNames(
    "form-field",
    {
      "has-error": hasErrorMessage
    },
    className
  );

  return (
    <div className={formFieldClassName}>
      {Boolean(label) && (
        <label id={labelledBy} className={"form-field-label"}>
          {label}
        </label>
      )}

      {children}

      {hasErrorMessage && <p>{errorMessage}</p>}

      {!hasErrorMessage && hasHelperMessage && (
        <p className={"form-field-helper-message"}>{helperMessage}</p>
      )}
    </div>
  );
}

export default FormField;
