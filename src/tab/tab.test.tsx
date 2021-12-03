import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {TabItem, TabProps} from "./Tab";
import {Tab} from "..";
import {testA11y} from "../core/utils/test/testUtils";

const tabItems: TabItem[] = [
  {
    id: "tab-item-1",
    content: <div data-testid={"uncontrolled-tab.content-0"}>{"Tab Item 1"}</div>
  },
  {
    id: "tab-item-2",
    content: <div data-testid={"uncontrolled-tab.content-1"}>{"Tab Item 2"}</div>
  },
  {
    id: "tab-item-3",
    content: <div data-testid={"uncontrolled-tab.content-2"}>{"Tab Item 3"}</div>,
    isDisabled: true
  }
];

// For uncontrolled tab component
describe("<Tab/>", () => {
  const defaultUncontrolledTabProps: TabProps = {
    items: tabItems,
    children: [
      <div key={0} data-testid={"tab-views-0"}>
        {"Home tab"}
      </div>,
      <div key={1} data-testid={"tab-views-1"}>
        {"Following tab"}
      </div>,
      <div key={2} data-testid={"tab-views-2"}>
        {"Disabled tab"}
      </div>
    ],
    testid: "uncontrolled-tab",
    initialActiveTabIndex: 1
  };

  it("should render correctly", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Tab {...defaultUncontrolledTabProps} />);

    await testA11y(container);
  });

  it("should render items correctly", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);

    expect(screen.getAllByRole("listitem").length).toEqual(tabItems.length);

    for (let index = 0; index < tabItems.length; index++) {
      const tabContent = screen.getByTestId(`uncontrolled-tab.content-${index}`);

      expect(
        screen.getByTestId(`uncontrolled-tab.header.item-${index}`)
      ).toContainElement(tabContent);
    }
  });

  it("should add active index to active class", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);
    const {activeTabIndex} = defaultUncontrolledTabProps;

    for (let index = 0; index < tabItems.length; index++) {
      if (activeTabIndex === index) {
        expect(screen.getByTestId(`uncontrolled-tab.header.item-${index}`)).toHaveClass(
          "tab-header-item--is-active"
        );
      }
    }
  });

  it("should render active index correctly", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);
    const {activeTabIndex, children} = defaultUncontrolledTabProps;

    for (let index = 0; index < tabItems.length; index++) {
      if (activeTabIndex === index) {
        expect(screen.getByTestId(`uncontrolled-tab.body`)).toContain(children[index]);
      }
    }
  });
});

// For controlled tab component
describe("<Tab/>", () => {
  const defaultControlledTabProps: TabProps = {
    items: tabItems,
    children: [
      <div key={0} data-testid={"tab-views-0"}>
        {"Home tab"}
      </div>,
      <div key={1} data-testid={"tab-views-1"}>
        {"Following tab"}
      </div>,
      <div key={2} data-testid={"tab-views-2"}>
        {"Disabled tab"}
      </div>
    ],
    testid: "uncontrolled-tab",
    initialActiveTabIndex: 1,
    onTabChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Tab {...defaultControlledTabProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Tab {...defaultControlledTabProps} />);

    await testA11y(container);
  });
});
