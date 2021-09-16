import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import RadioGroup, {RadioGroupProps} from "./RadioGroup";
import {testA11y} from "../../../../core/utils/test/testUtils";

describe("<RadioGroup />", () => {
  const radioGroupItems: RadioGroupProps["items"] = [
    {
      id: "radio-input-1",
      content: <p data-testid={"radio-input.content-0"}>{"Test 1"}</p>,
      inputProps: {htmlFor: "radio-input", name: "radio-input", value: "test.1"}
    },
    {
      id: "radio-input-2",
      content: <p data-testid={"radio-input.content-1"}>{"Test 2"}</p>,
      inputProps: {htmlFor: "radio-input", name: "radio-input", value: "test.2"}
    },
    {
      id: "radio-input-3",
      content: <p data-testid={"radio-input.content-2"}>{"Test 3"}</p>,
      inputProps: {htmlFor: "radio-input", name: "radio-input", value: "test.3"}
    }
  ];

  const defaultRadioGroupProps: RadioGroupProps = {
    testid: "radio-group",
    items: radioGroupItems,
    onSelect: jest.fn(),
    selectedItem: null
  };

  it("should render correctly", () => {
    render(<RadioGroup {...defaultRadioGroupProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<RadioGroup {...defaultRadioGroupProps} />);

    await testA11y(container, {rules: {"duplicate-id-aria": {enabled: false}}});
  });

  it("should render items correctly", () => {
    render(<RadioGroup {...defaultRadioGroupProps} />);

    expect(screen.getAllByRole("listitem").length).toEqual(radioGroupItems.length);

    for (let index = 0; index < radioGroupItems.length; index++) {
      const radioInputContent = screen.getByTestId(`radio-input.content-${index}`);

      expect(screen.getByTestId(`radio-group.item-${index}`)).toContainElement(
        radioInputContent
      );
    }
  });

  it("should add checked attribute to selectedItem", () => {
    const {rerender} = render(<RadioGroup {...defaultRadioGroupProps} />);

    for (let index = 0; index < radioGroupItems.length; index++) {
      expect(
        screen.getByDisplayValue(radioGroupItems[index].inputProps.value)
      ).not.toBeChecked();
    }

    rerender(
      <RadioGroup {...defaultRadioGroupProps} selectedItem={radioGroupItems[1]} />
    );

    expect(screen.getByDisplayValue(radioGroupItems[1].inputProps.value)).toBeChecked();
  });
});
