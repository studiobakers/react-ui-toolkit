import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {testA11y} from "../../core/utils/test/testUtils";
import DropdownList, {DropdownListProps} from "./DropdownList";

describe("<DropdownList />", () => {
  const defaultDropdownListProps: DropdownListProps<string> = {
    testid: "dropdown-list",
    options: [
      {id: "1", title: "dropdown-option-1"},
      {id: "2", title: "dropdown-option-2"},
      {id: "3", title: "dropdown-option-3"}
    ],
    focusedOption: {id: "1", title: "test"},
    isVisible: true,
    onFocus: jest.fn(),
    onSelect: jest.fn(),
    selectedOption: {id: "1", title: "test"},
    role: "listbox"
  };

  it("should render correctly", () => {
    render(<DropdownList {...defaultDropdownListProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<DropdownList {...defaultDropdownListProps} />);

    await testA11y(container, {
      rules: {
        "aria-required-parent": {enabled: false},
        list: {enabled: false},
        "aria-input-field-name": {enabled: false}
      }
    });
  });

  it("should add dropdown-list--is-visible class name while isVisible is true", () => {
    const {rerender} = render(<DropdownList {...defaultDropdownListProps} />);

    expect(screen.getByRole("listbox")).toHaveClass("dropdown-list--is-visible");

    rerender(<DropdownList {...defaultDropdownListProps} isVisible={false} />);

    expect(screen.getByRole("listbox")).not.toHaveClass("dropdown-list--is-visible");
  });

  it("should render noOptionsMessage if options are empty", () => {
    render(
      <DropdownList
        {...defaultDropdownListProps}
        options={[]}
        noOptionsMessage={"No options"}
      />
    );

    expect(screen.getByRole("listbox")).toContainElement(screen.getByText("No options"));
  });
});
