import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../../../core/utils/test/testUtils";
import RadioInput, {RadioInputProps} from "./RadioInput";

describe("<RadioInput />", () => {
  afterEach(cleanup);

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
    const {getByTestId} = render(<RadioInput {...defaultRadioInputProps} />);

    const radioInputContent = getByTestId("radio-input.content");

    expect(getByTestId(defaultRadioInputProps.testid!)).toContainElement(
      radioInputContent
    );
  });

  it("should add checked attribute and radio-input-label--is-selected class when isSelected is true", () => {
    const {getByTestId, rerender} = render(<RadioInput {...defaultRadioInputProps} />);

    const radioInput = document.getElementsByClassName("radio-input")[0];

    expect(radioInput).not.toBeChecked();

    rerender(<RadioInput {...defaultRadioInputProps} isSelected={true} />);

    expect(radioInput).toBeChecked();
    expect(getByTestId(defaultRadioInputProps.testid!)).toHaveClass(
      "radio-input-label--is-selected"
    );
  });

  it("should run onSelect event handler correctly", () => {
    render(<RadioInput {...defaultRadioInputProps} />);

    const radioInput = document.getElementsByTagName("input")[0];

    fireEvent.click(radioInput, {target: {value: "test"}});

    expect(radioInput.value).toBe("test");
    expect(defaultRadioInputProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("should add disabled attribute and radio-input-label--is-disabled class when isDisabled is true", () => {
    const {getByTestId} = render(
      <RadioInput isDisabled={true} {...defaultRadioInputProps} />
    );

    const radioInput = document.getElementsByTagName("input")[0];

    expect(radioInput).toHaveAttribute("disabled");
    expect(radioInput).toBeDisabled();
    expect(getByTestId(defaultRadioInputProps.testid!)).toHaveClass(
      "radio-input-label--is-disabled"
    );
  });
});
