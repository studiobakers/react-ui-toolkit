import {fireEvent, render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TypeaheadSelect, {TypeaheadSelectProps} from "./TypeaheadSelect";
import {testA11y} from "../../core/utils/test/testUtils";

describe("<TypeaheadSelect />", () => {
  const defaultTypeaheadSelectProps: TypeaheadSelectProps = {
    testid: "typeahead-select",
    options: [
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
        "aria-input-field-name": {enabled: false},
        "nested-interactive": {enabled: false}
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
    render(
      <TypeaheadSelect initialKeyword={"initial"} {...defaultTypeaheadSelectProps} />
    );

    const typeaheadSelect = screen.getByRole("textbox") as HTMLInputElement;

    expect(typeaheadSelect).toHaveValue("initial");

    await userEvent.clear(typeaheadSelect);

    expect(typeaheadSelect).toHaveValue("");

    await userEvent.type(typeaheadSelect, "test");

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

  it("should render option menu when focused", async () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
      />
    );

    const dropdownList = screen.getByRole("listbox");

    expect(dropdownList).not.toHaveClass("typeahead-select--is-dropdown-menu-open");

    await userEvent.click(screen.getByRole("textbox"));

    expect(dropdownList).toHaveClass("typeahead-select--is-dropdown-menu-open");
  });

  it("should run click event handle when option is selected", async () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[]}
      />
    );

    await userEvent.click(screen.getByRole("textbox"));

    const firstOption = screen.getByText("first-dropdown-option");

    await userEvent.click(firstOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);
    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledWith(
      expect.objectContaining({id: "1", title: "first-dropdown-option"})
    );
  });

  it("should not render option menu when selectedOptionLimit is reached", () => {
    render(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptionLimit={1}
      />
    );

    const dropdownList = screen.getByRole("listbox");

    // When selectedOptionLimit is reached, the input is not rendered
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(dropdownList).not.toHaveClass("typeahead-select--is-dropdown-menu-open");
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

    const dropdownList = screen.getByRole("listbox");

    await userEvent.click(screen.getByRole("textbox"));

    expect(dropdownList).toHaveClass("typeahead-select--is-dropdown-menu-open");

    const typeaheadInput = screen.getByRole("textbox");

    await userEvent.type(typeaheadInput, "second-dropdown");

    const searchedOption = screen.getByText("second-dropdown-option");

    expect(dropdownList).toContainElement(searchedOption);

    fireEvent.focus(searchedOption);

    await userEvent.click(searchedOption);

    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledTimes(1);
    expect(defaultTypeaheadSelectProps.onSelect).toHaveBeenCalledWith(
      expect.objectContaining({id: "2", title: "second-dropdown-option"})
    );
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

    // All 3 options should be visible
    expect(screen.getByText("first-dropdown-option")).toBeInTheDocument();
    expect(screen.getByText("second-dropdown-option")).toBeInTheDocument();
    expect(screen.getByText("third-dropdown-option")).toBeInTheDocument();

    // After selecting option 2, rerender with it as selected
    rerender(
      <TypeaheadSelect
        {...defaultTypeaheadSelectProps}
        testid={"test-dropdown-visibility"}
        selectedOptions={[{id: "2", title: "second-dropdown-option"}]}
        selectedOptionLimit={2}
      />
    );

    // Option 2 should no longer be in the dropdown options (but still visible as a selected tag)
    const dropdownContent = screen.getByRole("listbox").querySelector(".select-content") as HTMLElement;

    expect(within(dropdownContent).queryByText("second-dropdown-option")).not.toBeInTheDocument();
    expect(within(dropdownContent).getByText("first-dropdown-option")).toBeInTheDocument();
    expect(within(dropdownContent).getByText("third-dropdown-option")).toBeInTheDocument();
  });
});
/* eslint
      no-magic-numbers: "off",
      testing-library/no-node-access: "off"
*/
