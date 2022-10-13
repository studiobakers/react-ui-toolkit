import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import {NumberInputProps} from "./util/numberInputTypes";
import {testA11y} from "../../../core/utils/test/testUtils";
import NumberInput from "./NumberInput";

describe('<NumberInput type={"number"} />', () => {
  const numberInputProps: NumberInputProps = {
    testid: "number-input",
    name: "number-input",
    formatProps: {
      shouldFormatToLocaleString: true,
      locale: "en-EN"
    },
    maximumFractionDigits: 2,
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<NumberInput {...numberInputProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<NumberInput {...numberInputProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("should format value to with 'en-EN' locale", () => {
    render(<NumberInput {...numberInputProps} value={"1234567.89"} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1,234,567.89");
  });

  it("should remove leading zeros", () => {
    render(<NumberInput {...numberInputProps} value={"0001234.50"} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1,234.50");
  });

  it("should parse to scientific notation", () => {
    render(<NumberInput {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "1,234,567.89");

    expect(input).toHaveValue("1234567.89");
  });

  it("should have at most 2 decimal places", () => {
    render(<NumberInput {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "100.55555");

    expect(input).toHaveValue("100.55");
  });

  it("should not allow enter letter", () => {
    render(<NumberInput {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "ABC");

    expect(input).toHaveValue(undefined);
  });

  it("should not allow enter empty string", () => {
    render(<NumberInput {...numberInputProps} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, " ");

    expect(input).toHaveValue(undefined);
  });

  it("should not allow negative zero without decimal part", () => {
    render(<NumberInput {...numberInputProps} maximumFractionDigits={0} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, "-0");

    expect(input).toHaveValue("0");
  });
});
