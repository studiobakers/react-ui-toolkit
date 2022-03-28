import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import CheckboxInput, {CheckboxInputProps} from "./CheckboxInput";
import {testA11y} from "../../../core/utils/test/testUtils";

describe("<CheckboxInput />", () => {
  const defaultCheckboxInputProps: CheckboxInputProps = {
    testid: "checkbox-input",
    isSelected: false,
    item: {
      id: "checkbox-input",
      content: <p data-testid={"checkbox-input.content"}>{"Test"}</p>,
      inputProps: {name: "checkbox-input", htmlFor: "checkbox-input", value: "Test"}
    },
    onSelect: jest.fn()
  };

  it("should render correctly", () => {
    render(<CheckboxInput {...defaultCheckboxInputProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<CheckboxInput {...defaultCheckboxInputProps} />);

    await testA11y(container);
  });

  it("should add disabled attribute when isDisabled is true", () => {
    render(<CheckboxInput isDisabled={true} {...defaultCheckboxInputProps} />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("should add checked attribute when isSelected is true", () => {
    const {rerender} = render(<CheckboxInput {...defaultCheckboxInputProps} />);

    const checkboxInput = screen.getByRole("checkbox");

    expect(checkboxInput).not.toBeChecked();

    rerender(<CheckboxInput {...defaultCheckboxInputProps} isSelected={true} />);

    expect(checkboxInput).toBeChecked();
  });

  it("should run onSelect event handler correctly", () => {
    render(<CheckboxInput {...defaultCheckboxInputProps} />);

    const checkboxInput = screen.getByRole("checkbox");

    userEvent.click(checkboxInput);

    expect(defaultCheckboxInputProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
