import "./_form-field.scss";

import React from "react";
import classNames from "classnames";
import FormFieldMessageRow from "./message-row/FormFieldMessageRow";

interface FormFieldProps {
  children: React.ReactNode;
  labelledBy?: string;
  label?: string;
  className?: string;
  helperMessages?: Array<string>;
  errorMessages?: Array<string>;
}

function FormField(props: FormFieldProps) {
  const {labelledBy, label, className, children, errorMessages, helperMessages} = props;
  const hasErrorMessage = Boolean(errorMessages?.length);
  const hasHelperMessage = Boolean(helperMessages?.length);
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
