import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";
import userEvent from "@testing-library/user-event";

import {testA11y} from "../../../core/utils/test/testUtils";
import RadioInput, {RadioInputProps} from "./RadioInput";

describe("<RadioInput />", () => {
  const defaultRadioInputProps: RadioInputProps = {
    testid: "radio-input",
    isSelected: false,
    onSelect: jest.fn(),
    item: {
      id: "radio-input",
      content: <p data-testid={"radio-input.content"}>{"Test"}</p>,
      inputProps: {htmlFor: "radio-input", name: "radio-input", value: "test"}
    }
  };

  it("should render correctly", () => {
    render(<RadioInput {...defaultRadioInputProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<RadioInput {...defaultRadioInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<RadioInput {...defaultRadioInputProps} />);

    await testA11y(container);
  });

  it("should render content correctly", () => {
    const {container} = render(<RadioInput {...defaultRadioInputProps} />);

    const radioInputContent = screen.getByText("Test");

    expect(container).toContainElement(radioInputContent);
  });

  it("should add checked attribute and radio-input-label--is-selected class when isSelected is true", () => {
    const {rerender} = render(<RadioInput {...defaultRadioInputProps} />);

    const radioInput = screen.getByRole("radio", {name: "Test"});

    expect(radioInput).not.toBeChecked();

    rerender(<RadioInput {...defaultRadioInputProps} isSelected={true} />);

    expect(radioInput).toBeChecked();
    expect(screen.getByTestId(defaultRadioInputProps.testid!)).toHaveClass(
      "radio-input-label--is-selected"
    );
  });

  it("should run onSelect event handler correctly", () => {
    render(<RadioInput {...defaultRadioInputProps} />);

    const radioInput = screen.getByRole("radio", {
      name: "Test"
    }) as HTMLInputElement;

    userEvent.click(radioInput);

    expect(radioInput.value).toBe("test");
    expect(defaultRadioInputProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("should add disabled attribute and radio-input-label--is-disabled class when isDisabled is true", () => {
    render(<RadioInput isDisabled={true} {...defaultRadioInputProps} />);

    const radioInput = screen.getByRole("radio", {name: "Test"});

    expect(radioInput).toBeDisabled();
    expect(screen.getByTestId(defaultRadioInputProps.testid!)).toHaveClass(
      "radio-input-label--is-disabled"
    );
  });
});
