import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {testA11y} from "../../core/utils/test/testUtils";
import FormField, {FormFieldProps} from "./FormField";
import Input from "../input/Input";

describe("<FormField />", () => {
  const defaultFormFieldProps: FormFieldProps = {
    testid: "form-field",
    children: <Input onChange={jest.fn} name={"test"} testid={"form-field.input"} />
  };

  it("should render correctly", () => {
    render(<FormField {...defaultFormFieldProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<FormField {...defaultFormFieldProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("should render children correctly", () => {
    const {container} = render(<FormField {...defaultFormFieldProps} />);

    const childrenContent = screen.getByRole("textbox");

    expect(container).toContainElement(childrenContent);
  });

  it("should render label correctly", () => {
    render(
      <FormField
        label={"Test"}
        labelledBy={"form-field.labelled-by"}
        labelFor={"form-field.input"}
        {...defaultFormFieldProps}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const formFieldLabel = document.getElementsByTagName("label")[0];

    expect(screen.getByTestId(defaultFormFieldProps.testid!)).toHaveTextContent("Test");
    expect(formFieldLabel).toHaveAttribute("id", "form-field.labelled-by");
    expect(formFieldLabel).toHaveAttribute("for", "form-field.input");
  });

  it("should handle errorMessages correctly", () => {
    const formFieldErrorMessages = ["Test Error 1", "Test Error 2"];

    render(
      <FormField errorMessages={formFieldErrorMessages} {...defaultFormFieldProps} />
    );

    expect(screen.getByTestId(defaultFormFieldProps.testid!)).toHaveClass(
      "form-field--has-error"
    );

    formFieldErrorMessages.forEach((errorMessage) => {
      expect(screen.getByTestId(defaultFormFieldProps.testid!)).toHaveTextContent(
        errorMessage
      );
    });
  });

  it("should handle helperMessages correctly", () => {
    const formFieldHelperMessages = ["Test Helper 1", "Test Helper 2"];

    render(
      <FormField helperMessages={formFieldHelperMessages} {...defaultFormFieldProps} />
    );

    formFieldHelperMessages.forEach((helperMessage) => {
      expect(screen.getByTestId(defaultFormFieldProps.testid!)).toHaveTextContent(
        helperMessage
      );
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(formFieldHelperMessages.length);
  });

  it("should not render helper messages if error messages exists", () => {
    const formFieldErrorMessages = ["Test Error 1", "Test Error 2"];
    const formFieldHelperMessages = ["Test Helper 1", "Test Helper 2"];

    render(
      <FormField
        helperMessages={formFieldHelperMessages}
        errorMessages={formFieldErrorMessages}
        {...defaultFormFieldProps}
      />
    );

    expect(screen.getByTestId(defaultFormFieldProps.testid!)).toHaveClass(
      "form-field--has-error"
    );

    formFieldErrorMessages.forEach((errorMessage) => {
      expect(screen.getByTestId(defaultFormFieldProps.testid!)).toHaveTextContent(
        errorMessage
      );
    });

    formFieldHelperMessages.forEach((helperMessage) => {
      expect(screen.getByTestId(defaultFormFieldProps.testid!)).not.toHaveTextContent(
        helperMessage
      );
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(formFieldErrorMessages.length);

    // eslint-disable-next-line testing-library/no-node-access
    const helperMessagesContent = document.getElementsByClassName(
      "form-field__helper-message-list"
    )[0];

    expect(helperMessagesContent).toBeUndefined();
  });
});
