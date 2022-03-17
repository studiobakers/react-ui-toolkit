import React from "react";
import {fireEvent, render, screen, within} from "@testing-library/react";
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

  it("should render option menu when focused", () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
      />
    );

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    expect(dropdownList).not.toHaveClass("dropdown-list--is-visible");

    // fireEvent.focus(screen.getByRole("listbox"));
    userEvent.click(screen.getByRole("listbox"));

    expect(dropdownList).toHaveClass("dropdown-list--is-visible");
  });

  it("should run click event handle when option is selected", () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
      />
    );

    const selectedOptionList = screen.getByRole("list");

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    const firstOption = within(dropdownList).getByTestId(
      "test-dropdown-visibility.item-0"
    );

    userEvent.click(firstOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);

    const secondOption = within(dropdownList).getByTestId(
      "test-dropdown-visibility.item-1"
    );

    userEvent.click(secondOption);

    expect(selectedOptionList).not.toContainElement(secondOption);
  });

  it("should not render option menu when selectedOptionLimit is reached", () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptionLimit={1}
      />
    );

    const selectedOptionList = screen.getByRole("list");

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    const secondOption = within(dropdownList).getByTestId(
      "test-dropdown-visibility.item-1"
    );

    userEvent.click(secondOption);

    expect(selectedOptionList).not.toContainElement(secondOption);
  });

  it("should render when select an option flow correctly", () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
        selectedOptionLimit={1}
      />
    );

    userEvent.click(screen.getByRole("listbox"));

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    expect(dropdownList).toHaveClass("dropdown-list--is-visible");

    const typeaheadInput = screen.getByRole("textbox");

    userEvent.type(typeaheadInput, "second-dropdown");

    const searchedOption = screen.getByTestId("test-dropdown-visibility.item-1");

    expect(dropdownList).toContainElement(searchedOption);

    fireEvent.focus(searchedOption);

    userEvent.click(searchedOption);

    expect(dropdownList).not.toHaveClass("dropdown-list--is-visible");

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("should not render selected option on dropdown list", () => {
    const {rerender} = render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
        selectedOptionLimit={2}
      />
    );

    userEvent.click(screen.getByRole("listbox"));

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    expect(dropdownList).toHaveClass("dropdown-list--is-visible");

    const typeaheadInput = screen.getByRole("textbox");

    userEvent.type(typeaheadInput, "second-dropdown");

    const searchedOption = screen.getByTestId("test-dropdown-visibility.item-1");

    expect(dropdownList).toContainElement(searchedOption);

    fireEvent.focus(searchedOption);

    userEvent.click(searchedOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);

    expect(dropdownList).toHaveClass("dropdown-list--is-visible");

    rerender(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[{id: "2", title: "second-dropdown-option"}]}
        selectedOptionLimit={2}
      />
    );

    const selectedOptionList = screen.getByRole("list");

    expect(dropdownList.children.length).toBe(2);

    // One of items is the input another one is selected option
    expect(selectedOptionList.children.length).toBe(2);
  });
});
/* eslint
      no-magic-numbers: "off",
      testing-library/no-node-access: "off"
*/
