import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TypeaheadSelect, {TypeaheadSelectProps} from "./TypeaheadSelect";
import {testA11y} from "../../core/utils/test/testUtils";
import {TypeaheadSelectOption} from "../util/selectTypes";

describe("<TypeaheadSelect />", () => {
  const defaultTypeaheadSelectProps: TypeaheadSelectProps<
    TypeaheadSelectOption & {title: string}
  > = {
    testid: "typeahead-select",
    options: [
      {id: "1", title: "first-dropdown-option"},
      {id: "2", title: "second-dropdown-option"},
      {id: "3", title: "third-dropdown-option"}
    ],
    onKeywordChange: jest.fn(),
    selectedOptions: [{id: "1", title: "test"}],
    onSelect: jest.fn(),
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

  it("should update value on change", async () => {
    render(<TypeaheadSelect {...defaultTypeaheadSelectProps} />);

    const typeaheadSelect = screen.getByRole("textbox");

    await userEvent.type(typeaheadSelect, "test");

    expect(typeaheadSelect).toHaveValue("test");
  });

  it("should add disabled attribute when isDisabled is true", () => {
    render(<TypeaheadSelect isDisabled={true} {...defaultTypeaheadSelectProps} />);

    const typeaheadSelect = screen.getByRole("textbox");

    expect(typeaheadSelect).toBeDisabled();
  });

  it("should set initialValue and remove when set new value", async () => {
    render(<TypeaheadSelect initialKeyword={"initial"} {...defaultTypeaheadSelectProps} />);

    const typeaheadSelectInput = screen.getByTestId(
      `${defaultTypeaheadSelectProps.testid}.search`
    ).firstElementChild as HTMLInputElement;

    expect(typeaheadSelectInput).toHaveValue("initial");

    await userEvent.clear(typeaheadSelectInput);
    await userEvent.type(typeaheadSelectInput, "test");

    expect(typeaheadSelectInput).toHaveValue("test");
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

  it("should render option menu when focused", async () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility-on-focus"}
      />
    );

    const dropdownList = screen.getByTestId("test-dropdown-visibility-on-focus");

    expect(dropdownList).not.toHaveClass("typeahead-select--is-dropdown-menu-open");

    await userEvent.click(screen.getAllByRole("button")[0]);

    expect(dropdownList).toHaveClass("typeahead-select--is-dropdown-menu-open");
  });

  it("should run click event handler when option is selected", async () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
      />
    );

    const firstOption = await screen.findByText(
      defaultTypeaheadSelectProps.options[0].title
    );

    await userEvent.click(firstOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);

    const secondOption = await screen.findByText(
      defaultTypeaheadSelectProps.options[1].title
    );

    await userEvent.click(secondOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(2);
  });

  it("should not render option menu when selectedOptionLimit is reached", async () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptionLimit={1}
      />
    );

    const selectedOptionList = screen.getByRole("list");

    const secondOption = await screen.findByText(
      defaultTypeaheadSelectProps.options[1].title
    );

    await userEvent.click(secondOption);

    expect(selectedOptionList).not.toContainElement(secondOption);
  });

  it("should render when select an option flow correctly", async () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
        selectedOptionLimit={1}
      />
    );

    await userEvent.click(screen.getByRole("button"));

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    expect(dropdownList).toHaveClass("typeahead-select--is-dropdown-menu-open");

    const typeaheadInput = screen.getByRole("textbox");

    await userEvent.type(typeaheadInput, "second-dropdown");

    const searchedOption = await screen.findByText(
      defaultTypeaheadSelectProps.options[0].title
    );

    expect(dropdownList).toContainElement(searchedOption);

    fireEvent.focus(searchedOption);

    await userEvent.click(searchedOption);

    expect(dropdownList).not.toHaveClass("typeahead-select--is-dropdown-menu-open");

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("should not render selected option on dropdown list", async () => {
    const {rerender} = render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
        selectedOptionLimit={2}
      />
    );

    await userEvent.click(screen.getByRole("button"));

    const dropdownList = screen.getByTestId("test-dropdown-visibility");

    expect(dropdownList).toHaveClass("typeahead-select--is-dropdown-menu-open");

    const typeaheadInput = screen.getByRole("textbox");

    userEvent.type(typeaheadInput, "second-dropdown");

    const searchedOption = await screen.findByText(
      defaultTypeaheadSelectProps.options[1].title
    );

    expect(dropdownList).toContainElement(searchedOption);

    fireEvent.focus(searchedOption);

    await userEvent.click(searchedOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);
    expect(dropdownList).not.toHaveClass("select--is-visible");

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

    expect(selectedOptionList.children.length).toBe(1);
  });
});
/* eslint
      no-magic-numbers: "off",
      testing-library/no-node-access: "off"
*/
