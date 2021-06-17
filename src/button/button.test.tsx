import React from "react";
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import Button from "./Button";
import {testA11y} from "../core/utils/test/testUtils";
import {ButtonProps} from "..";

describe("<Button />", () => {
  const defaultButtonProps: ButtonProps = {
    testid: "button",
    children: "Test"
  };

  it("should render correctly", () => {
    render(<Button {...defaultButtonProps} />);
  });

  it("should render children correctly", () => {
    const {getByTestId} = render(<Button {...defaultButtonProps} />);

    expect(getByTestId(defaultButtonProps.testid!)).toHaveTextContent("Test");
  });

  it("should match snapshot", () => {
    const tree = create(<Button {...defaultButtonProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Button {...defaultButtonProps} />);

    await testA11y(container);
  });

  it("should add disabled attribute and button--is-inactive class when isDisabled is true", () => {
    const {getByTestId} = render(<Button isDisabled={true} {...defaultButtonProps} />);

    expect(getByTestId(defaultButtonProps.testid!)).toHaveAttribute("disabled");
    expect(getByTestId(defaultButtonProps.testid!)).toBeDisabled();
    expect(getByTestId(defaultButtonProps.testid!)).toHaveClass("button--is-inactive");
  });

  it("should display custom spinner correctly", () => {
    const customSpinnerContent = <p data-testid={"custom-spinner"}>{"Loading..."}</p>;

    const {rerender, getByTestId} = render(
      <Button
        shouldDisplaySpinner={true}
        customSpinner={customSpinnerContent}
        {...defaultButtonProps}
      />
    );

    const customSpinner = getByTestId("custom-spinner");

    expect(getByTestId(defaultButtonProps.testid!)).toContainElement(customSpinner);

    rerender(
      <Button
        shouldDisplaySpinner={false}
        customSpinner={customSpinnerContent}
        {...defaultButtonProps}
      />
    );

    expect(getByTestId(defaultButtonProps.testid!)).not.toContainElement(customSpinner);
  });

  it("should not run click event handler while button is disabled", () => {
    const handleClick = jest.fn();

    const {getByTestId} = render(
      <Button onClick={handleClick} isDisabled={true} {...defaultButtonProps} />
    );

    fireEvent.click(getByTestId(defaultButtonProps.testid!));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should not run click event handler while shouldDisplaySpinner is true", () => {
    const handleClick = jest.fn();

    const {getByTestId} = render(
      <Button onClick={handleClick} shouldDisplaySpinner={true} {...defaultButtonProps} />
    );

    fireEvent.click(getByTestId(defaultButtonProps.testid!));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should run click event handler correctly", () => {
    const handleClick = jest.fn();

    const {getByTestId} = render(
      <Button onClick={handleClick} {...defaultButtonProps} />
    );

    fireEvent.click(getByTestId(defaultButtonProps.testid!));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should run mouseOver event handler correctly", () => {
    const handleMouseOver = jest.fn();
    const handleFocus = jest.fn();

    const {getByTestId} = render(
      <Button
        onFocus={handleFocus}
        onMouseOver={handleMouseOver}
        {...defaultButtonProps}
      />
    );

    fireEvent.mouseOver(getByTestId(defaultButtonProps.testid!));
    expect(handleMouseOver).toHaveBeenCalledTimes(1);
  });

  it("should run focus event handler correctly", () => {
    const handleFocus = jest.fn();

    const {getByTestId} = render(
      <Button onFocus={handleFocus} {...defaultButtonProps} />
    );

    fireEvent.focus(getByTestId(defaultButtonProps.testid!));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("should run mouseUp event handler correctly", () => {
    const handleMouseUp = jest.fn();

    const {getByTestId} = render(
      <Button onMouseUp={handleMouseUp} {...defaultButtonProps} />
    );

    fireEvent.mouseUp(getByTestId(defaultButtonProps.testid!));
    expect(handleMouseUp).toHaveBeenCalledTimes(1);
  });

  it("should run mouseDown event handler correctly", () => {
    const handleMouseDown = jest.fn();

    const {getByTestId} = render(
      <Button onMouseDown={handleMouseDown} {...defaultButtonProps} />
    );

    fireEvent.mouseDown(getByTestId(defaultButtonProps.testid!));
    expect(handleMouseDown).toHaveBeenCalledTimes(1);
  });

  it("should run blur event handler correctly", () => {
    const handleBlur = jest.fn();

    const {getByTestId} = render(<Button onBlur={handleBlur} {...defaultButtonProps} />);

    fireEvent.blur(getByTestId(defaultButtonProps.testid!));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("should has the proper type attribute", () => {
    const {getByTestId, rerender} = render(<Button {...defaultButtonProps} />);

    expect(getByTestId(defaultButtonProps.testid!)).toHaveAttribute("type", "button");

    rerender(<Button type={"submit"} {...defaultButtonProps} />);

    expect(getByTestId(defaultButtonProps.testid!)).toHaveAttribute("type", "submit");

    rerender(<Button type={"reset"} {...defaultButtonProps} />);

    expect(getByTestId(defaultButtonProps.testid!)).toHaveAttribute("type", "reset");
  });
});
