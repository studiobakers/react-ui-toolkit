import "./_form-field-message-row.scss";

import React from "react";
import classNames from "classnames";

interface FormFieldMessageRowProps {
  className?: string;
  type: "error" | "warning" | "helper";
  message?: string;
  testid?: string;
}

function FormFieldMessageRow({
  className,
  type,
  message,
  testid
}: FormFieldMessageRowProps) {
  const messageRowClassName = classNames(
    "form-field-message-row",
    className,
    `${[type]}-message`
  );

  return (
    <p data-testid={testid} className={messageRowClassName}>
      {message}
    </p>
  );
}

export default FormFieldMessageRow;
