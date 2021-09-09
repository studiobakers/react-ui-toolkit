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

describe('<Input type={"number"} />', () => {
  const numberInputProps: InputProps = {
    testid: "number-input",
    name: "number-input",
    type: "number",
    localizationOptions: {
      shouldFormatToLocaleString: true,
      locale: "en-EN",
      maximumFractionDigits: 2
    },
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Input {...numberInputProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Input {...numberInputProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("should format value to with 'en-EN' locale", () => {
    render(<Input {...numberInputProps} value={"1234567.89"} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1,234,567.89");
  });

  it("should remove leading zeros", () => {
    render(<Input {...numberInputProps} value={"0001234.50"} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1,234.50");
  });

  it("should parse to scientific notation", () => {
    render(<Input {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "1,234,567.89");

    expect(input).toHaveValue("1234567.89");
  });

  it("should have at most 2 decimal places", () => {
    render(<Input {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "100.55555");

    expect(input).toHaveValue("100.55");
  });

  it("should not allow enter letter", () => {
    render(<Input {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "ABC");

    expect(input).toHaveValue(undefined);
  });

  it("should not allow enter empty string", () => {
    render(<Input {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, " ");

    expect(input).toHaveValue(undefined);
  });

  it("should not allow negative zero without decimal part", () => {
    render(
      <Input {...numberInputProps} localizationOptions={{maximumFractionDigits: 0}} />
    );

    const input = screen.getByRole("textbox");

    userEvent.type(input, "-0");

    expect(input).toHaveValue(undefined);
  });
});
