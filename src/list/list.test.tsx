import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../core/utils/test/testUtils";
import List, {ListProps} from "./List";
import ListItem from "./item/ListItem";

describe("<List />", () => {
  const listItems = ["Hipo", "Labs"];
  const defaultListProps: ListProps = {
    testid: "list",
    items: listItems,
    children: (item, testId, index) => (
      <ListItem key={`list-item-${index}`} testid={testId}>
        <span>{item}</span>
      </ListItem>
    )
  };

  it("should render correctly", () => {
    render(<List {...defaultListProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<List {...defaultListProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<List {...defaultListProps} />);

    await testA11y(container);
  });

  it("should render children correctly", () => {
    render(<List {...defaultListProps} />);

    expect(screen.getAllByRole("listitem").length).toBe(listItems.length);

    for (let index = 0; index < listItems.length; index++) {
      const listItemContent = screen.getByTestId(`list.item-${index}`);

      expect(screen.getAllByRole("listitem")[index]).toEqual(listItemContent);
    }
  });

  it("should render placeholder correctly", () => {
    const {container} = render(
      <List
        placeholderProps={{
          shouldDisplayPlaceholder: true,
          placeholder: <p data-testid={"list.placeholder"}>{"Loading..."}</p>
        }}
        {...defaultListProps}
      />
    );

    expect(container).toContainElement(screen.getByText("Loading..."));
  });

  it("should render empty state correctly", () => {
    render(
      <List
        emptyStateProps={{
          shouldDisplayEmptyState: true,
          emptyState: <p data-testid={"list.empty-state"}>{"Not found."}</p>
        }}
        {...defaultListProps}
      />
    );

    expect(screen.getByRole("list")).toContainElement(screen.getByText("Not found."));
  });

  it("should render placeholder if both shouldDisplayPlaceholder and shouldDisplayEmptyState are true", () => {
    render(
      <List
        emptyStateProps={{
          shouldDisplayEmptyState: true,
          emptyState: (
            <p data-testid={"list.empty-state"} className={"list--empty"}>
              {"Not found."}
            </p>
          )
        }}
        placeholderProps={{
          shouldDisplayPlaceholder: true,
          placeholder: <p data-testid={"list.placeholder"}>{"Loading..."}</p>
        }}
        {...defaultListProps}
      />
    );

    expect(screen.getByRole("list")).toContainElement(screen.getByText("Loading..."));
    expect(screen.queryByText("Not found.")).not.toBeInTheDocument();
  });

  it("should handle empty items correctly", () => {
    render(<List {...defaultListProps} items={[]} />);

    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });
});
