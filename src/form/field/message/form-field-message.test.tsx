import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {testA11y} from "../../../core/utils/test/testUtils";
import FormFieldMessage, {FormFieldMessageProps} from "./FormFieldMessage";

describe("<FormFieldMessage />", () => {
  const defaultFormFieldMessageProps: FormFieldMessageProps = {
    testid: "form-field-message",
    type: "error",
    message: "Form Field Message Test"
  };

  it("should render correctly", () => {
    render(<FormFieldMessage {...defaultFormFieldMessageProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<FormFieldMessage {...defaultFormFieldMessageProps} />);

    await testA11y(container);
  });

  it("should render message correctly", () => {
    render(
      <FormFieldMessage {...defaultFormFieldMessageProps} message={"Test Message"} />
    );

    expect(screen.getByText("Test Message"));
  });

  it("should have proper modifier class name for the type prop provided", () => {
    const {rerender} = render(<FormFieldMessage {...defaultFormFieldMessageProps} />);

    const formFieldMessageTypes: typeof defaultFormFieldMessageProps.type[] = [
      "error",
      "warning",
      "helper"
    ];

    formFieldMessageTypes.forEach((type) => {
      rerender(<FormFieldMessage {...defaultFormFieldMessageProps} type={type} />);

      expect(screen.getByText("Form Field Message Test")).toHaveClass(
        `form-field-message--is-${type}`
      );
    });
  });
});
