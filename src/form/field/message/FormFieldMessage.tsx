import "./_form-field-message.scss";

import React from "react";
import classNames from "classnames";

export interface FormFieldMessageProps {
  type: "error" | "warning" | "helper";
  customClassName?: string;
  message?: string;
  testid?: string;
}

function FormFieldMessage({
  customClassName,
  type,
  message,
  testid
}: FormFieldMessageProps) {
  return (
    <p
      data-testid={testid}
      className={classNames(
        "form-field-message",
        customClassName,
        `form-field-message--is-${type}`
      )}
    >
      {message}
    </p>
  );
}

export default FormFieldMessage;
