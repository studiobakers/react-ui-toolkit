import React from "react";
import classNames from "classnames";
import styled from "styled-components";

interface FormFieldProps {
  children: React.ReactNode;
  labelledBy?: string;
  label?: string;
  className?: string;
  // TODO: helperMessage and errorMessage should be array of string
  helperMessage?: string;
  errorMessage?: string;
}

const HelperMessage = styled.p`
  margin: 0;

  color: gray;
`;
const ErrorMessage = styled.p`
  margin: 0;

  color: red;
`;

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
