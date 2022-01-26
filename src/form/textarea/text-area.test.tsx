import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {testA11y} from "../../core/utils/test/testUtils";
import Textarea, {TextareaProps} from "./Textarea";

describe("<TextArea />", () => {
  const defaultTextAreaProps: TextareaProps = {
    testid: "text-area",
    name: "text-area",
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Textarea {...defaultTextAreaProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Textarea {...defaultTextAreaProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("onShiftEnter prop should work correctly", () => {
    const handleShiftEnter = jest.fn();
    const handleJustEnterPressed = jest.fn();

    render(
      <Textarea
        onJustEnterPressed={handleJustEnterPressed}
        onShiftEnter={handleShiftEnter}
        {...defaultTextAreaProps}
      />
    );
    const textArea = screen.getByRole("textbox");

    fireEvent.keyDown(textArea, {
      keyCode: 16
    });
    fireEvent.keyDown(textArea, {
      keyCode: 13
    });

    expect(handleShiftEnter).toHaveBeenCalledTimes(1);
    expect(handleJustEnterPressed).not.toHaveBeenCalled();
  });

  it("onJustEnterPressed prop should work correctly", () => {
    const handleShiftEnter = jest.fn();
    const handleJustEnterPressed = jest.fn();

    render(
      <Textarea
        onJustEnterPressed={handleJustEnterPressed}
        onShiftEnter={handleShiftEnter}
        {...defaultTextAreaProps}
      />
    );
    const textArea = screen.getByRole("textbox");

    fireEvent.keyDown(textArea, {
      keyCode: 16
    });
    fireEvent.keyUp(textArea, {
      keyCode: 16
    });
    fireEvent.keyDown(textArea, {
      keyCode: 13
    });

    expect(handleShiftEnter).not.toHaveBeenCalled();
    expect(handleJustEnterPressed).toHaveBeenCalledTimes(1);
  });

  it("should have proper class name", () => {
    render(
      <Textarea
        customClassNames={{
          container: "text-area__container",
          textarea: "text-area__textarea"
        }}
        {...defaultTextAreaProps}
      />
    );

    expect(screen.getByTestId("textarea-container")).toHaveClass("text-area__container");
    expect(screen.getByRole("textbox")).toHaveClass("text-area__textarea");
  });
});
