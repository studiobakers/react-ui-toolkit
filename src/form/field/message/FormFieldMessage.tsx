import "./_form-field-message.scss";

import React from "react";
import classNames from "classnames";

interface FormFieldMessageProps {
  className?: string;
  type: "error" | "warning" | "helper";
  message?: string;
  testid?: string;
}

function FormFieldMessage({className, type, message, testid}: FormFieldMessageProps) {
  const messageRowClassName = classNames(
    "form-field-message",
    className,
    `form-field-message--is-${type}`
  );

  return (
    <p data-testid={testid} className={messageRowClassName}>
      {message}
    </p>
  );
}

export default FormFieldMessage;
