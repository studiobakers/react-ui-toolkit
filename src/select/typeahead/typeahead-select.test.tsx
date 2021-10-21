import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TypeaheadSelect, {TypeaheadSelectProps} from "./TypeaheadSelect";
import {testA11y} from "../../core/utils/test/testUtils";

describe("<TypeaheadSelect />", () => {
  const defaultTypeaheadSelectProps: TypeaheadSelectProps = {
    testid: "typeahead-select",
    dropdownOptions: [
      {id: "1", title: "first-dropdown-option"},
      {id: "2", title: "second-dropdown-option"},
      {id: "3", title: "third-dropdown-option"}
    ],
    selectedOptions: [{id: "1", title: "test"}],
    onSelect: jest.fn(),
    onKeywordChange: jest.fn(),
    onTagRemove: jest.fn(),
    typeaheadProps: {
      placeholder: "test placeholder",
      name: "test typeahead"
    }
  };

  it("should render correctly", () => {
    render(<TypeaheadSelect {...defaultTypeaheadSelectProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<TypeaheadSelect {...defaultTypeaheadSelectProps} />);

    await testA11y(container, {
      rules: {
        "aria-required-parent": {enabled: false},
        "aria-required-children": {enabled: false},
        list: {enabled: false},
        "aria-input-field-name": {enabled: false}
      }
    });
  });

  it("should update value on change", () => {
    render(<TypeaheadSelect {...defaultTypeaheadSelectProps} />);

    const typeaheadSelect = screen.getByRole("textbox");

    userEvent.type(typeaheadSelect, "test");

    expect(typeaheadSelect).toHaveValue("test");
  });

  it("should add disabled attribute when isDisabled is true", () => {
    render(<TypeaheadSelect isDisabled={true} {...defaultTypeaheadSelectProps} />);

    const typeaheadSelect = screen.getByRole("textbox");

    expect(typeaheadSelect).toBeDisabled();
  });

  it("should set initialValue and remove when set new value", () => {
    render(
      <TypeaheadSelect initialKeyword={"initial"} {...defaultTypeaheadSelectProps} />
    );

    const typeaheadSelect = screen.getByRole("textbox") as HTMLInputElement;

    expect(typeaheadSelect).toHaveValue("initial");

    typeaheadSelect.setSelectionRange(0, typeaheadSelect.value.length);

    userEvent.type(typeaheadSelect, "test");

    expect(typeaheadSelect).toHaveValue("test");
  });

  it("should render custom spinner correctly", () => {
    const customSpinner = <p data-testid={"spinner"}>{"Spinner"}</p>;

    const {container} = render(
      <TypeaheadSelect
        customSpinner={customSpinner}
        areOptionsFetching={true}
        {...defaultTypeaheadSelectProps}
      />
    );

    const spinner = screen.getByText("Spinner");

    expect(container).toContainElement(spinner);
  });
});
