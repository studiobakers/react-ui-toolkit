import React from "react";
import classNames from "classnames";
import styled from "styled-components";

const HelperMessage = styled.p`
  margin: 0;

  color: gray;
`;
const ErrorMessage = styled.p`
  margin: 0;

  color: red;
`;

interface FormFieldProps {
  labelledBy: string;
  label?: string;
  className?: string;
  children: any;
  helperMessage?: string;
  errorMessage?: string;
}

function FormField(props: FormFieldProps) {
  const {labelledBy, label, className, children, errorMessage, helperMessage} = props;
  const hasLabel = Boolean(label);
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
      {hasLabel && (
        <label id={labelledBy} className={"form-field-label"}>
          {label}
        </label>
      )}

      {children}

      {hasErrorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {!hasErrorMessage && hasHelperMessage && (
        <HelperMessage className={"form-field-helper-message"}>
          {helperMessage}
        </HelperMessage>
      )}
    </div>
  );
}

export default FormField;
