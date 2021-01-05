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
  helperMessages?: string[];
  errorMessages?: string[];
  testid?: string;
}

function FormField(props: FormFieldProps) {
  const {
    label,
    labelledBy,
    labelFor,
    customClassName,
    children,
    errorMessages,
    helperMessages,
    testid
  } = props;
  const hasErrorMessage = Boolean(errorMessages?.length);
  const hasHelperMessage = Boolean(helperMessages?.length);
  const formFieldClassName = classNames("form-field", customClassName, {
    "form-field--has-error": hasErrorMessage
  });

  return (
    <div className={formFieldClassName} data-testid={testid}>
      <label id={labelledBy} htmlFor={labelFor} className={"form-field__label"}>
        {Boolean(label) && <span className={"form-field__title"}>{label}</span>}

        {children}
      </label>

      {hasErrorMessage &&
        errorMessages?.map((message) => (
          <FormFieldMessageRow
            key={`error.${message}`}
            type={"error"}
            message={message}
            testid={`${testid}.form-field-message-row.error`}
          />
        ))}

      {!hasErrorMessage &&
        hasHelperMessage &&
        helperMessages?.map((message) => (
          <FormFieldMessageRow
            key={`helper.${message}`}
            type={"helper"}
            message={message}
            testid={`${testid}.form-field-message-row.helper`}
          />
        ))}
    </div>
  );
}

export default FormField;
