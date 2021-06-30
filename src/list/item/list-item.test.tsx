import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";
import userEvent from "@testing-library/user-event";

import {testA11y} from "../../core/utils/test/testUtils";
import ListItem, {ListItemProps} from "./ListItem";

describe("<ListItem />", () => {
  const defaultListItemProps: ListItemProps = {
    testid: "list-item",
    children: <p data-testid={"list-item.content"}>{"Test"}</p>
  };

  it("should render correctly", () => {
    render(<ListItem {...defaultListItemProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<ListItem {...defaultListItemProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<ListItem {...defaultListItemProps} />);

    await testA11y(container, {rules: {listitem: {enabled: false}}});
  });

  it("should render children correctly", () => {
    const {container} = render(<ListItem {...defaultListItemProps} />);

    expect(container).toContainElement(screen.getByText("Test"));
  });

  it("Can be clicked", () => {
    const handleClick = jest.fn();

    const {container} = render(
      <ListItem
        clickableListItemProps={{onClick: handleClick, tabIndex: 2}}
        {...defaultListItemProps}
      />
    );
    const listItemButton = screen.getByRole("button");

    userEvent.click(listItemButton);

    expect(container).toContainElement(listItemButton);
    expect(listItemButton).toHaveAttribute("tabIndex", "2");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should run click event handler when enter key pressed", () => {
    const handleClick = jest.fn();

    render(
      <ListItem
        clickableListItemProps={{onClick: handleClick, tabIndex: 2}}
        {...defaultListItemProps}
      />
    );

    fireEvent.focus(screen.getByRole("button"));
    fireEvent.keyPress(screen.getByRole("button"), {
      keyCode: 13
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
