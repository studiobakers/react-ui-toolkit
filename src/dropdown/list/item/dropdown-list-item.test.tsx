import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import {testA11y} from "../../../core/utils/test/testUtils";
import DropdownListItem, {DropdownListItemProps} from "./DropdownListItem";

describe("<DropdownListItem />", () => {
  const defaultDropdownListItemProps: DropdownListItemProps = {
    testid: "dropdown-list-item",
    selectedOption: {id: "1", title: "test"},
    option: {id: "1", title: "test"},
    onFocus: jest.fn(),
    onSelect: jest.fn(),
    onKeyDown: jest.fn()
  };

  it("should render correctly", () => {
    render(<DropdownListItem {...defaultDropdownListItemProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<DropdownListItem {...defaultDropdownListItemProps} />);

    await testA11y(container, {rules: {"aria-required-parent": {enabled: false}}});
  });

  it("should have proper modifier class name", () => {
    const {rerender} = render(
      <DropdownListItem
        {...defaultDropdownListItemProps}
        canSelectAlreadySelected={true}
        focusedOption={{...defaultDropdownListItemProps.option}}
      />
    );

    expect(screen.getByRole("option")).toHaveClass("dropdown-list-item--is-selected");
    expect(screen.getByRole("option")).toHaveClass("dropdown-list-item--is-focused");
    expect(screen.getByRole("option")).toHaveClass("dropdown-list-item--can-be-selected");

    rerender(
      <DropdownListItem
        {...defaultDropdownListItemProps}
        option={{...defaultDropdownListItemProps.option, isDisabled: true}}
      />
    );

    expect(screen.getByRole("option")).toHaveClass("dropdown-list-item--is-disabled");
  });

  it("should render custom content if it exists", () => {
    const {container} = render(
      <DropdownListItem
        {...defaultDropdownListItemProps}
        option={{
          ...defaultDropdownListItemProps.option,
          CustomContent: <p>{"custom content"}</p>
        }}
      />
    );

    expect(container).toContainElement(screen.getByText("custom content"));
  });

  describe("should handle event handlers correctly", () => {
    it("should not run click event handler when option is disabled and option is selected or canSelectAlreadySelected is provided as false", () => {
      // isDisabled: true, isSelected: true , canSelectAlreadySelected: default = false
      const {rerender} = render(
        <DropdownListItem
          {...defaultDropdownListItemProps}
          option={{...defaultDropdownListItemProps.option, isDisabled: true}}
        />
      );

      userEvent.click(screen.getByRole("option"));
      expect(defaultDropdownListItemProps.onSelect).not.toHaveBeenCalled();

      // isDisabled: true, isSelected: false , canSelectAlreadySelected: default = false
      rerender(
        <DropdownListItem
          {...defaultDropdownListItemProps}
          selectedOption={{id: "2", title: "test 2"}}
          option={{...defaultDropdownListItemProps.option, isDisabled: true}}
        />
      );

      userEvent.click(screen.getByRole("option"));
      expect(defaultDropdownListItemProps.onSelect).not.toHaveBeenCalled();

      // isDisabled: true, isSelected: true , canSelectAlreadySelected: true
      rerender(
        <DropdownListItem
          {...defaultDropdownListItemProps}
          canSelectAlreadySelected={true}
          option={{...defaultDropdownListItemProps.option, isDisabled: true}}
        />
      );

      userEvent.click(screen.getByRole("option"));
      expect(defaultDropdownListItemProps.onSelect).not.toHaveBeenCalled();
    });

    it("should run click event handler when option is not disabled and option is not selected or canSelectAlreadySelected is provided as true", () => {
      // isDisabled: false, isSelected: true , canSelectAlreadySelected: true
      const {rerender} = render(
        <DropdownListItem
          {...defaultDropdownListItemProps}
          canSelectAlreadySelected={true}
        />
      );

      userEvent.click(screen.getByRole("option"));
      expect(defaultDropdownListItemProps.onSelect).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      // isDisabled: false, isSelected: false , canSelectAlreadySelected: default = false
      rerender(
        <DropdownListItem
          {...defaultDropdownListItemProps}
          selectedOption={{id: "2", title: "test 2"}}
        />
      );

      userEvent.click(screen.getByRole("option"));
      expect(defaultDropdownListItemProps.onSelect).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      // isDisabled: false, isSelected: false , canSelectAlreadySelected: true
      rerender(
        <DropdownListItem
          {...defaultDropdownListItemProps}
          selectedOption={{id: "2", title: "test 2"}}
          canSelectAlreadySelected={true}
        />
      );

      userEvent.click(screen.getByRole("option"));
      expect(defaultDropdownListItemProps.onSelect).toHaveBeenCalledTimes(1);
    });

    it("should run focus event handler correctly", () => {
      const {container} = render(<DropdownListItem {...defaultDropdownListItemProps} />);

      fireEvent.focus(container);

      expect(defaultDropdownListItemProps.onFocus).toHaveBeenCalledTimes(1);
    });

    it("should run key down event handler correctly", () => {
      const {rerender} = render(<DropdownListItem {...defaultDropdownListItemProps} />);

      fireEvent.keyDown(screen.getByRole("option"), {
        keyCode: 16
      });

      expect(defaultDropdownListItemProps.onKeyDown).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      rerender(
        <DropdownListItem {...defaultDropdownListItemProps} onKeyDown={undefined} />
      );

      expect(defaultDropdownListItemProps.onKeyDown).not.toHaveBeenCalled();
    });
  });
});
