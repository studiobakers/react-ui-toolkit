import React from "react";
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

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
    const {getByTestId} = render(<ListItem {...defaultListItemProps} />);

    expect(getByTestId(defaultListItemProps.testid!)).toContainElement(
      getByTestId("list-item.content")
    );
  });

  it("clickableListItemProps should work correctly", () => {
    const handleClick = jest.fn();
    const {getByTestId, getByRole} = render(
      <ListItem
        clickableListItemProps={{onClick: handleClick, tabIndex: 2}}
        {...defaultListItemProps}
      />
    );
    const listItemButton = getByRole("button");

    fireEvent.click(listItemButton);

    expect(getByTestId(defaultListItemProps.testid!)).toContainElement(listItemButton);
    expect(listItemButton).toHaveAttribute("tabIndex", "2");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should run click event handler when enter key pressed", () => {
    const handleClick = jest.fn();
    const {getByRole} = render(
      <ListItem
        clickableListItemProps={{onClick: handleClick, tabIndex: 2}}
        {...defaultListItemProps}
      />
    );

    fireEvent.keyPress(getByRole("button"), {
      keyCode: 13
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
