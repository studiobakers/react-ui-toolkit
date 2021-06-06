import React from "react";
import {render, cleanup, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../core/utils/test/testUtils";
import List, {ListProps} from "./List";
import ListItem from "./item/ListItem";

describe("<List />", () => {
  afterEach(cleanup);

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

  it("should matches snapshot", () => {
    const tree = create(<List {...defaultListProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<List {...defaultListProps} />);

    await testA11y(container);
  });

  it("should render children correctly", () => {
    const {getByTestId} = render(<List {...defaultListProps} />);

    expect(getByTestId("list").children).toHaveLength(listItems.length);

    for (let index = 0; index < listItems.length; index++) {
      const listItemContent = getByTestId(`list.item-${index}`);

      expect(getByTestId("list").children[index]).toEqual(listItemContent);
    }
  });

  it("should render placeholder correctly", () => {
    const {getByTestId} = render(
      <List
        placeholderProps={{
          shouldDisplayPlaceholder: true,
          placeholder: <p data-testid={"list.placeholder"}>{"Loading..."}</p>
        }}
        {...defaultListProps}
      />
    );

    expect(getByTestId("list")).toContainElement(getByTestId("list.placeholder"));
  });

  it("should render empty state correctly", () => {
    const {getByTestId} = render(
      <List
        emptyStateProps={{
          shouldDisplayEmptyState: true,
          emptyState: <p data-testid={"list.empty-state"}>{"Not found."}</p>
        }}
        {...defaultListProps}
      />
    );

    expect(getByTestId("list")).toContainElement(getByTestId("list.empty-state"));
  });

  it("should render placeholder if both shouldDisplayPlaceholder and shouldDisplayEmptyState is true", () => {
    const {getByTestId} = render(
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

    expect(getByTestId("list")).toContainElement(getByTestId("list.placeholder"));
    expect(screen.queryByText("Not found.")).not.toBeInTheDocument();
  });
});
