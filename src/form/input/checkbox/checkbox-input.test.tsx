import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import CheckboxInput, {CheckboxInputProps} from "./CheckboxInput";
import {testA11y} from "../../../core/utils/test/testUtils";

describe("<CheckboxInput />", () => {
  afterEach(cleanup);

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

  it("should matches snapshot", () => {
    const tree = create(<CheckboxInput {...defaultCheckboxInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<CheckboxInput {...defaultCheckboxInputProps} />);

    await testA11y(container);
  });

  it("disabled property should works correctly", () => {
    const {getByTestId} = render(
      <CheckboxInput isDisabled={true} {...defaultCheckboxInputProps} />
    );

    expect(getByTestId("checkbox-input")).toHaveClass(
      "checkbox-input-label--is-disabled"
    );

    const checkboxInput = document.getElementsByClassName("checkbox-input")[0];

    expect(checkboxInput).toHaveAttribute("disabled");
    expect(checkboxInput).toBeDisabled();
  });

  it("isSelected property should works correctly", () => {
    const {getByTestId, rerender} = render(
      <CheckboxInput {...defaultCheckboxInputProps} />
    );

    const checkboxInput = document.getElementsByClassName("checkbox-input")[0];

    expect(checkboxInput).not.toBeChecked();

    rerender(<CheckboxInput {...defaultCheckboxInputProps} isSelected={true} />);

    expect(checkboxInput).toBeChecked();
    expect(getByTestId("checkbox-input")).toHaveClass(
      "checkbox-input-label--is-selected"
    );
  });

  it("should call onSelect prop correctly", () => {
    render(<CheckboxInput {...defaultCheckboxInputProps} />);

    const checkboxInput = document.getElementsByClassName("checkbox-input")[0];

    fireEvent.click(checkboxInput, {target: {checked: true}});

    expect(defaultCheckboxInputProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
