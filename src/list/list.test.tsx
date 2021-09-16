import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {testA11y} from "../core/utils/test/testUtils";
import List, {ListProps} from "./List";
import ListItem from "./item/ListItem";

describe("<List />", () => {
  const listItems = ["Hipo", "Labs"];
  const defaultListProps: ListProps = {
    testid: "list",
    items: listItems,
    role: "list",
    children: (item, testId, index) => (
      <ListItem key={`list-item-${index}`} role={"listitem"} testid={testId}>
        <span>{item}</span>
      </ListItem>
    )
  };

  it("should render correctly", () => {
    render(<List {...defaultListProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<List {...defaultListProps} />);

    await testA11y(container);
  });

  it("should render items correctly", () => {
    const {rerender} = render(<List {...defaultListProps} />);

    expect(screen.getAllByRole("listitem").length).toBe(listItems.length);

    for (let index = 0; index < listItems.length; index++) {
      const listItemContent = screen.getAllByRole("listitem")[index];

      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByRole("list").children[index]).toEqual(listItemContent);
    }

    rerender(<List {...defaultListProps} items={[]} />);

    expect(screen.queryAllByRole("listitem").length).toBe(0);
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
    const {container} = render(
      <List
        emptyStateProps={{
          shouldDisplayEmptyState: true,
          emptyState: <p data-testid={"list.empty-state"}>{"Not found."}</p>
        }}
        {...defaultListProps}
      />
    );

    expect(container).toContainElement(screen.getByText("Not found."));
  });

  it("should render placeholder when shouldDisplayPlaceholder and shouldDisplayEmptyState are both true", () => {
    const {container} = render(
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

    expect(container).toContainElement(screen.getByText("Loading..."));
    expect(screen.queryByText("Not found.")).not.toBeInTheDocument();
  });
});
