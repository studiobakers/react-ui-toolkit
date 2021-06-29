import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import Input, {InputProps} from "./Input";
// import {testA11y} from "../../core/utils/test/testUtils";

describe("<Input />", () => {
  const defaultInputProps: InputProps = {
    testid: "input",
    name: "input",
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Input {...defaultInputProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<Input {...defaultInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  //   it("should pass a11y test", async () => {
  //     const {container} = render(
  //       <Input {...defaultInputProps}  />
  //     );

  //     await testA11y(container);
  //   });

  it("should run onChange event handler correctly", () => {
    render(<Input {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {target: {value: "test"}});

    expect(defaultInputProps.onChange).toHaveBeenCalled();
  });

  it("should update value on change", () => {
    render(<Input {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {target: {value: "test"}});

    expect(input).toHaveValue("test");
  });

  it("should render left and right icons correctly", () => {
    const iconContent = <p data-testid={"icon"}>{"Test"}</p>;

    const {rerender} = render(<Input leftIcon={iconContent} {...defaultInputProps} />);

    const leftIcon = screen.getByText("Test");

    expect(screen.getByTestId(defaultInputProps.testid!)).toContainElement(leftIcon);

    rerender(<Input rightIcon={iconContent} {...defaultInputProps} />);

    const rightIcon = screen.getByText("Test");

    expect(screen.getByTestId(defaultInputProps.testid!)).toContainElement(rightIcon);
  });

  it("should add disabled attribute and input--is-disabled class when isDisabled is true", () => {
    render(<Input isDisabled={true} {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("input--is-disabled");
  });

  it("should add input--has-error class when hasError is true", () => {
    render(<Input hasError={true} {...defaultInputProps} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("input--has-error");
  });

  it("should format number input correctly", () => {
    render(
      <Input maxLength={3} type={"number"} maxFractionDigits={2} {...defaultInputProps} />
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "text");

    fireEvent.change(input, {target: {value: "1545.5478"}});

    expect(input).toHaveValue("1545.54");
  });
});
