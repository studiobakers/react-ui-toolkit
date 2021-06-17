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
    const {getByTestId} = render(<List {...defaultListProps} />);

    expect(getByTestId(defaultListProps.testid!).children).toHaveLength(listItems.length);

    for (let index = 0; index < listItems.length; index++) {
      const listItemContent = getByTestId(`list.item-${index}`);

      expect(getByTestId(defaultListProps.testid!).children[index]).toEqual(
        listItemContent
      );
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

    expect(getByTestId(defaultListProps.testid!)).toContainElement(
      getByTestId("list.placeholder")
    );
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

    expect(getByTestId(defaultListProps.testid!)).toContainElement(
      getByTestId("list.empty-state")
    );
  });

  it("should render placeholder if both shouldDisplayPlaceholder and shouldDisplayEmptyState are true", () => {
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

    expect(getByTestId(defaultListProps.testid!)).toContainElement(
      getByTestId("list.placeholder")
    );
    expect(screen.queryByText("Not found.")).not.toBeInTheDocument();
  });

  it("should handle empty items correctly", () => {
    const {getByTestId} = render(<List {...defaultListProps} items={[]} />);

    expect(getByTestId(defaultListProps.testid!).children).toHaveLength(0);
  });
});
