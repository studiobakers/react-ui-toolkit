import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import Input, {InputProps} from "./Input";
// import {testA11y} from "../../core/utils/test/testUtils";

describe("<Input />", () => {
  afterEach(cleanup);

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

  it("should call onChange prop correctly", () => {
    render(<Input {...defaultInputProps} />);

    const input = document.getElementsByTagName("input")[0];

    fireEvent.change(input, {target: {value: "test"}});

    expect(defaultInputProps.onChange).toHaveBeenCalled();
  });

  it("should update value on change", () => {
    render(<Input {...defaultInputProps} />);

    const input = document.getElementsByTagName("input")[0];

    fireEvent.change(input, {target: {value: "test"}});

    expect(input.value).toEqual("test");
  });

  it("should render left and right icons correctly", () => {
    const iconContent = <p data-testid={"icon"}>{"Test"}</p>;

    const {rerender, getByTestId} = render(
      <Input leftIcon={iconContent} {...defaultInputProps} />
    );

    const leftIcon = getByTestId("icon");

    expect(getByTestId(defaultInputProps.testid!)).toContainElement(leftIcon);

    rerender(<Input rightIcon={iconContent} {...defaultInputProps} />);

    const rightIcon = getByTestId("icon");

    expect(getByTestId(defaultInputProps.testid!)).toContainElement(rightIcon);
  });

  it("isDisabled property should works correctly", () => {
    render(<Input isDisabled={true} {...defaultInputProps} />);

    const input = document.getElementsByTagName("input")[0];

    expect(input).toHaveAttribute("disabled");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("input--is-disabled");
  });

  it("hasError property should works correctly", () => {
    render(<Input hasError={true} {...defaultInputProps} />);

    const input = document.getElementsByTagName("input")[0];

    expect(input).toHaveClass("input--has-error");
  });

  it("should format number input correctly", () => {
    render(
      <Input maxLength={3} type={"number"} maxFractionDigits={2} {...defaultInputProps} />
    );

    const input = document.getElementsByTagName("input")[0];

    expect(input).toHaveAttribute("type", "text");

    fireEvent.change(input, {target: {value: "1545.5478"}});

    expect(input.value).toEqual("1545.54");
  });
});
