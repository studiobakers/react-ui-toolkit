import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import {testA11y} from "../core/utils/test/testUtils";
import Switch, {SwitchProps} from "./Switch";

describe("<Switch />", () => {
  const defaultSwitchProps: SwitchProps = {
    isToggledOn: true,
    onToggle: jest.fn(),
    testid: "switch"
  };

  it("should render correctly", () => {
    render(<Switch {...defaultSwitchProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Switch {...defaultSwitchProps} />);

    await testA11y(container, {rules: {label: {enabled: false}}});
  });

  it("should run onToggle event handler correctly", () => {
    render(<Switch {...defaultSwitchProps} />);

    userEvent.click(screen.getByRole("switch"));

    expect(defaultSwitchProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it("should not run onToggle event handler when isDisabled is true", () => {
    render(<Switch {...defaultSwitchProps} isDisabled={true} />);

    userEvent.click(screen.getByRole("switch"));

    expect(defaultSwitchProps.onToggle).not.toHaveBeenCalled();
  });

  it("should add disabled attribute when isDisabled is true", () => {
    render(<Switch {...defaultSwitchProps} isDisabled={true} />);

    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("should add aria-readonly attribute when isDisabled is true", () => {
    render(<Switch {...defaultSwitchProps} isDisabled={true} />);

    expect(screen.getByRole("switch")).toHaveAttribute("aria-readonly");
  });

  it("should add checked attribute when isToggledOn is true", () => {
    render(<Switch {...defaultSwitchProps} />);

    expect(screen.getByRole("switch")).toBeChecked();
  });
});
