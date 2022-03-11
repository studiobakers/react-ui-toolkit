import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import {TabItem, TabProps} from "./Tab";
import {Tab} from "..";
import {testA11y} from "../core/utils/test/testUtils";

const tabItems: TabItem[] = [
  {
    id: "tab-item-1",
    content: <div data-testid={"uncontrolled-tab.content-0"}>{"Tab Item 0"}</div>
  },
  {
    id: "tab-item-2",
    content: <div data-testid={"uncontrolled-tab.content-1"}>{"Tab Item 1"}</div>
  },
  {
    id: "tab-item-3",
    content: <div data-testid={"uncontrolled-tab.content-2"}>{"Tab Item 2"}</div>,
    isDisabled: true
  }
];

// For uncontrolled tab component
describe("<UncontrolledTab/>", () => {
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

  it("should render header items correctly", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);

    expect(screen.getAllByRole("listitem").length).toEqual(tabItems.length);

    for (let index = 0; index < tabItems.length; index++) {
      const tabContent = screen.getByText(`Tab Item ${index}`);

      expect(screen.getAllByRole("listitem")[index]).toContainElement(tabContent);
    }
  });

  it("should add active index to active class", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);
    const {activeTabIndex} = defaultUncontrolledTabProps;

    for (let index = 0; index < tabItems.length; index++) {
      if (activeTabIndex === index) {
        expect(screen.getByDisplayValue(`Tab Item ${index}`)).toHaveClass(
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
        expect(screen.getByDisplayValue("Following tab")).toContain(children[index]);
      }
    }
  });

  it("should add active class after click", () => {
    render(<Tab {...defaultUncontrolledTabProps} />);
    const selectedIndex = 0;
    const selectedItem = screen.getAllByRole("button")[selectedIndex];

    fireEvent.click(selectedItem);

    expect(screen.getAllByRole("listitem")[selectedIndex]).toHaveClass(
      "tab-header-item--is-active"
    );
  });
});

// For controlled tab component
describe("<ControlledTab/>", () => {
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
    initialActiveTabIndex: 0,
    onTabChange: jest.fn()
  };

  it("should render correctly", () => {
    render(<Tab {...defaultControlledTabProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Tab {...defaultControlledTabProps} />);

    await testA11y(container);
  });

  it("should render active index correctly", () => {
    render(<Tab {...defaultControlledTabProps} />);
    const {activeTabIndex, children} = defaultControlledTabProps;

    for (let index = 0; index < tabItems.length; index++) {
      if (activeTabIndex === index) {
        expect(screen.getByDisplayValue("Home Tab")).toContain(children[index]);
      }
    }
  });

  it("should onTabChange function is called", () => {
    render(<Tab {...defaultControlledTabProps} />);
    const {onTabChange} = defaultControlledTabProps;
    const item = screen.getAllByRole("button")[0];

    fireEvent.click(item);
    expect(onTabChange).toHaveBeenCalledTimes(1);
  });
});
