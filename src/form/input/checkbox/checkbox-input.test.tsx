import React from "react";
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

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

  it("should match snapshot", () => {
    const tree = create(<CheckboxInput {...defaultCheckboxInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<CheckboxInput {...defaultCheckboxInputProps} />);

    await testA11y(container);
  });

  it("should add disabled attribute and checkbox-input-label--is-disabled class when isDisabled is true", () => {
    const {getByTestId} = render(
      <CheckboxInput isDisabled={true} {...defaultCheckboxInputProps} />
    );

    expect(getByTestId(defaultCheckboxInputProps.testid!)).toHaveClass(
      "checkbox-input-label--is-disabled"
    );

    const checkboxInput = document.getElementsByClassName("checkbox-input")[0];

    expect(checkboxInput).toHaveAttribute("disabled");
    expect(checkboxInput).toBeDisabled();
  });

  it("should add checked attribute and checkbox-input-label--is-selected class when isSelected is true", () => {
    const {getByTestId, rerender} = render(
      <CheckboxInput {...defaultCheckboxInputProps} />
    );

    const checkboxInput = document.getElementsByClassName("checkbox-input")[0];

    expect(checkboxInput).not.toBeChecked();

    rerender(<CheckboxInput {...defaultCheckboxInputProps} isSelected={true} />);

    expect(checkboxInput).toBeChecked();
    expect(getByTestId(defaultCheckboxInputProps.testid!)).toHaveClass(
      "checkbox-input-label--is-selected"
    );
  });

  it("should run onSelect event handler correctly", () => {
    render(<CheckboxInput {...defaultCheckboxInputProps} />);

    const checkboxInput = document.getElementsByClassName("checkbox-input")[0];

    fireEvent.click(checkboxInput, {target: {checked: true}});

    expect(defaultCheckboxInputProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
