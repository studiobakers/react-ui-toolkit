import "./_form-field.scss";

import React from "react";
import classNames from "classnames";
import FormFieldMessageRow from "./message-row/FormFieldMessageRow";

export interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  labelledBy?: string;
  labelFor?: string;
  customClassName?: string;
  helperMessages?: Array<string>;
  errorMessages?: Array<string>;
}

function FormField(props: FormFieldProps) {
  const {
    label,
    labelledBy,
    labelFor,
    customClassName,
    children,
    errorMessages,
    helperMessages
  } = props;
  const hasErrorMessage = Boolean(errorMessages?.length);
  const hasHelperMessage = Boolean(helperMessages?.length);
  const formFieldClassName = classNames(
    "form-field",
    {
      "has-error": hasErrorMessage
    },
    customClassName
  );

  return (
    <div className={formFieldClassName}>
      <label id={labelledBy} htmlFor={labelFor} className={"form-field-label"}>
        <span className={"form-field-label-text"}>{label}</span>

        {children}
      </label>

      {hasErrorMessage &&
        errorMessages?.map((message) => (
          <FormFieldMessageRow
            key={`error.${message}`}
            type={"error"}
            message={message}
          />
        ))}

      {!hasErrorMessage &&
        hasHelperMessage &&
        helperMessages?.map((message) => (
          <FormFieldMessageRow
            key={`helper.${message}`}
            type={"helper"}
            message={message}
          />
        ))}
    </div>
  );
}

export default FormField;
