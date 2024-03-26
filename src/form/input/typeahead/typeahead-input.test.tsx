import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import {testA11y} from "../../../core/utils/test/testUtils";
import TypeaheadInput, {TypeaheadInputProps} from "./TypeaheadInput";

describe("<TypeaheadInput />", () => {
  const defaultTypeaheadInputProps: TypeaheadInputProps = {
    testid: "typeahead-input",
    name: "typeahead-input",
    onQueryChange: jest.fn(),
    placeholder: "typeahead input"
  };

  it("should render correctly", () => {
    render(<TypeaheadInput {...defaultTypeaheadInputProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<TypeaheadInput {...defaultTypeaheadInputProps} />);

    await testA11y(container);
  });

  it("should update value on change", () => {
    render(<TypeaheadInput {...defaultTypeaheadInputProps} />);

    const typeaheadInput = screen.getByRole("textbox");

    userEvent.type(typeaheadInput, "test");

    expect(typeaheadInput).toHaveValue("test");
  });

  it("should render left and right icons correctly", () => {
    const iconContent = <p data-testid={"icon"}>{"Test"}</p>;

    const {rerender, container} = render(
      <TypeaheadInput leftIcon={iconContent} {...defaultTypeaheadInputProps} />
    );

    const leftIcon = screen.getByText("Test");

    expect(container).toContainElement(leftIcon);

    rerender(<TypeaheadInput rightIcon={iconContent} {...defaultTypeaheadInputProps} />);

    const rightIcon = screen.getByText("Test");

    expect(container).toContainElement(rightIcon);
  });

  it("should run onQueryChange when value is changed", () => {
    const handleQueryChange = jest.fn();

    render(
      <TypeaheadInput {...defaultTypeaheadInputProps} onQueryChange={handleQueryChange} />
    );

    handleQueryChange("test");

    expect(handleQueryChange).toHaveBeenCalled();
  });

  it("should add placeholder correctly", () => {
    render(<TypeaheadInput {...defaultTypeaheadInputProps} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "typeahead input");
  });

  it("should have the extra input props passed to the input", () => {
    render(<TypeaheadInput {...defaultTypeaheadInputProps} enterKeyHint={"go"} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("enterkeyhint", "go");
  });
});
