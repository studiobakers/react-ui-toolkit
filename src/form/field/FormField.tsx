import "./_form-field.scss";

import React from "react";
import classNames from "classnames";

import FormFieldMessage from "./message/FormFieldMessage";
import List from "../../list/List";
import ListItem from "../../list/item/ListItem";

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

      {hasErrorMessage && (
        <List
          testid={`${testid}.error-messages`}
          customClassName={"form-field__error-message-list"}
          items={errorMessages!}
        >
          {(message, messageTestId) => (
            <ListItem customClassName={"form-field__error-message-list__item"}>
              <FormFieldMessage type={"error"} message={message} testid={messageTestId} />
            </ListItem>
          )}
        </List>
      )}

      {!hasErrorMessage && hasHelperMessage && (
        <List
          testid={`${testid}.helper-messages`}
          customClassName={"form-field__helper-message-list"}
          items={helperMessages!}
        >
          {(message, messageTestId) => (
            <ListItem customClassName={"form-field__helper-message-list__item"}>
              <FormFieldMessage
                type={"helper"}
                message={message}
                testid={messageTestId}
              />
            </ListItem>
          )}
        </List>
      )}
    </div>
  );
}

export default FormField;
