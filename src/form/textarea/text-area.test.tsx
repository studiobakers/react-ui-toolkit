import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../../core/utils/test/testUtils";
import Textarea, {TextareaProps} from "./Textarea";

describe("<TextArea />", () => {
  afterEach(cleanup);

  const defaultTextAreaProps: TextareaProps = {
    testid: "text-area",
    name: "text-area",
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Textarea {...defaultTextAreaProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<Textarea {...defaultTextAreaProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Textarea {...defaultTextAreaProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("onShiftEnter prop should work correctly", () => {
    const handleShiftEnter = jest.fn();
    const handleJustEnterPressed = jest.fn();

    const {getByTestId} = render(
      <Textarea
        onJustEnterPressed={handleJustEnterPressed}
        onShiftEnter={handleShiftEnter}
        {...defaultTextAreaProps}
      />
    );
    const textArea = getByTestId(defaultTextAreaProps.testid!);

    fireEvent.keyDown(textArea, {
      key: "Shift",
      keyCode: 16,
      code: "ShiftLeft"
    });
    fireEvent.keyDown(textArea, {
      key: "Enter",
      code: "Enter",
      keyCode: 13
    });

    expect(handleShiftEnter).toHaveBeenCalledTimes(1);
    expect(handleJustEnterPressed).not.toHaveBeenCalled();
  });

  it("onJustEnterPressed prop should work correctly", () => {
    const handleShiftEnter = jest.fn();
    const handleJustEnterPressed = jest.fn();

    const {getByTestId} = render(
      <Textarea
        onJustEnterPressed={handleJustEnterPressed}
        onShiftEnter={handleShiftEnter}
        {...defaultTextAreaProps}
      />
    );
    const textArea = getByTestId(defaultTextAreaProps.testid!);

    fireEvent.keyDown(textArea, {
      key: "Shift",
      keyCode: 16,
      code: "ShiftLeft"
    });
    fireEvent.keyUp(textArea, {
      key: "Shift",
      keyCode: 16,
      code: "ShiftLeft"
    });
    fireEvent.keyDown(textArea, {
      key: "Enter",
      code: "Enter",
      keyCode: 13
    });

    expect(handleShiftEnter).not.toHaveBeenCalled();
    expect(handleJustEnterPressed).toHaveBeenCalledTimes(1);
  });

  it("should have proper class name", () => {
    const {getByTestId} = render(
      <Textarea
        customClassNames={{
          container: "text-area__container",
          textarea: "text-area__textarea"
        }}
        {...defaultTextAreaProps}
      />
    );

    expect(getByTestId("textarea-container")).toHaveClass("text-area__container");
    expect(getByTestId(defaultTextAreaProps.testid!)).toHaveClass("text-area__textarea");
  });
});
