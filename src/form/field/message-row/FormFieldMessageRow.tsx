import "./_form-field-message-row.scss";

import React from "react";
import classNames from "classnames";

interface FormFieldMessageRowProps {
  className?: string;
  type: "error" | "warning" | "helper";
  message?: string;
}

function FormFieldMessageRow({className, type, message}: FormFieldMessageRowProps) {
  const messageRowClassName = classNames(
    "form-field-message-row",
    className,
    `${[type]}-message`
  );

  return <p className={messageRowClassName}>{message}</p>;
}

export default FormFieldMessageRow;
