import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Button, {ButtonProps} from "./Button";
import {testA11y} from "../core/utils/test/testUtils";

describe("<Button />", () => {
  const defaultButtonProps: ButtonProps = {
    testid: "button",
    children: "Test"
  };

  it("should render correctly", () => {
    render(<Button {...defaultButtonProps} />);
  });

  it("should render children correctly", () => {
    render(<Button {...defaultButtonProps} />);

    expect(screen.getByRole("button")).toHaveTextContent("Test");
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Button {...defaultButtonProps} />);

    await testA11y(container);
  });

  it("should add disabled attribute when isDisabled is true", () => {
    render(<Button isDisabled={true} {...defaultButtonProps} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should display custom spinner correctly", () => {
    const customSpinnerContent = <p data-testid={"custom-spinner"}>{"Loading..."}</p>;

    const {rerender, container} = render(
      <Button
        shouldDisplaySpinner={true}
        customSpinner={customSpinnerContent}
        {...defaultButtonProps}
      />
    );

    const customSpinner = screen.getByText("Loading...");

    expect(container).toContainElement(customSpinner);

    rerender(
      <Button
        shouldDisplaySpinner={false}
        customSpinner={customSpinnerContent}
        {...defaultButtonProps}
      />
    );

    expect(container).not.toContainElement(customSpinner);
  });

  it("should not run click event handler while button is disabled", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} isDisabled={true} {...defaultButtonProps} />);

    userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should not run click event handler while shouldDisplaySpinner is true", () => {
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} shouldDisplaySpinner={true} {...defaultButtonProps} />
    );

    userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should run click event handler correctly", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} {...defaultButtonProps} />);

    userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should run mouseOver event handler correctly", () => {
    const handleMouseOver = jest.fn();
    const handleFocus = jest.fn();

    render(
      <Button
        onFocus={handleFocus}
        onMouseOver={handleMouseOver}
        {...defaultButtonProps}
      />
    );

    fireEvent.mouseOver(screen.getByRole("button"));
    expect(handleMouseOver).toHaveBeenCalledTimes(1);
  });

  it("should run focus event handler correctly", () => {
    const handleFocus = jest.fn();

    render(<Button onFocus={handleFocus} {...defaultButtonProps} />);

    fireEvent.focus(screen.getByRole("button"));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("should run mouseUp event handler correctly", () => {
    const handleMouseUp = jest.fn();

    render(<Button onMouseUp={handleMouseUp} {...defaultButtonProps} />);

    fireEvent.mouseUp(screen.getByRole("button"));
    expect(handleMouseUp).toHaveBeenCalledTimes(1);
  });

  it("should run mouseDown event handler correctly", () => {
    const handleMouseDown = jest.fn();

    render(<Button onMouseDown={handleMouseDown} {...defaultButtonProps} />);

    fireEvent.mouseDown(screen.getByRole("button"));
    expect(handleMouseDown).toHaveBeenCalledTimes(1);
  });

  it("should run blur event handler correctly", () => {
    const handleBlur = jest.fn();

    render(<Button onBlur={handleBlur} {...defaultButtonProps} />);

    fireEvent.blur(screen.getByRole("button"));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("should has the proper type attribute", () => {
    const {rerender} = render(<Button {...defaultButtonProps} />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");

    rerender(<Button type={"submit"} {...defaultButtonProps} />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");

    rerender(<Button type={"reset"} {...defaultButtonProps} />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });
});
