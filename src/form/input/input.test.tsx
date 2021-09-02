import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Input, {InputProps} from "./Input";
import {testA11y} from "../../core/utils/test/testUtils";

describe("<Input />", () => {
  const defaultInputProps: InputProps = {
    testid: "input",
    name: "input",
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Input {...defaultInputProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Input {...defaultInputProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("should run onChange event handler correctly", () => {
    render(<Input {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "test");

    expect(defaultInputProps.onChange).toHaveBeenCalled();
  });

  it("should update value on change", () => {
    render(<Input {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "test");

    expect(input).toHaveValue("test");
  });

  it("should render left and right icons correctly", () => {
    const iconContent = <p data-testid={"icon"}>{"Test"}</p>;

    const {rerender, container} = render(
      <Input leftIcon={iconContent} {...defaultInputProps} />
    );

    const leftIcon = screen.getByText("Test");

    expect(container).toContainElement(leftIcon);

    rerender(<Input rightIcon={iconContent} {...defaultInputProps} />);

    const rightIcon = screen.getByText("Test");

    expect(container).toContainElement(rightIcon);
  });

  it("should add disabled attribute and input--is-disabled class when isDisabled is true", () => {
    render(<Input isDisabled={true} {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });
});
