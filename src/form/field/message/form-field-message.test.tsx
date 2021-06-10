import React from "react";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../../../core/utils/test/testUtils";
import FormFieldMessage, {FormFieldMessageProps} from "./FormFieldMessage";

describe("<FormFieldMessage />", () => {
  afterEach(cleanup);

  const defaultFormFieldMessageProps: FormFieldMessageProps = {
    testid: "form-field-message",
    type: "error"
  };

  it("should render correctly", () => {
    render(<FormFieldMessage {...defaultFormFieldMessageProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<FormFieldMessage {...defaultFormFieldMessageProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<FormFieldMessage {...defaultFormFieldMessageProps} />);

    await testA11y(container);
  });

  it("should render message correctly", () => {
    const {getByTestId} = render(
      <FormFieldMessage message={"Test Message"} {...defaultFormFieldMessageProps} />
    );

    expect(getByTestId(defaultFormFieldMessageProps.testid!)).toHaveTextContent(
      "Test Message"
    );
  });

  it("should have proper modifier class name for the type prop provided", () => {
    const {rerender, getByTestId} = render(
      <FormFieldMessage {...defaultFormFieldMessageProps} />
    );

    const formFieldMessageTypes: typeof defaultFormFieldMessageProps.type[] = [
      "error",
      "warning",
      "helper"
    ];

    formFieldMessageTypes.forEach((type) => {
      rerender(<FormFieldMessage {...defaultFormFieldMessageProps} type={type} />);

      expect(getByTestId(defaultFormFieldMessageProps.testid!)).toHaveClass(
        `form-field-message--is-${type}`
      );
    });
  });
});
