import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";
import userEvent from "@testing-library/user-event";

import PasswordInput, {PasswordInputProps} from "../password-input/PasswordInput";
import {testA11y} from "../../core/utils/test/testUtils";

describe("<PasswordInput />", () => {
  const defaultPasswordInputProps: PasswordInputProps = {
    testid: "password-input",
    name: "password-input",
    onChange: jest.fn(),
    placeholder: "Test",
    hideIcon: (
      <svg data-testid={"password-input.hide"} height={"16"} width={"16"}>
        <circle
          cx={"50"}
          cy={"50"}
          r={"40"}
          stroke={"black"}
          strokeWidth={"3"}
          fill={"red"}
        />
      </svg>
    ),
    revealIcon: (
      <svg data-testid={"password-input.reveal"} height={"16"} width={"16"}>
        <circle
          cx={"50"}
          cy={"50"}
          r={"40"}
          stroke={"black"}
          strokeWidth={"3"}
          fill={"green"}
        />
      </svg>
    )
  };

  it("should render correctly", () => {
    render(<PasswordInput {...defaultPasswordInputProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<PasswordInput {...defaultPasswordInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<PasswordInput {...defaultPasswordInputProps} />);

    await testA11y(container);
  });

  it("should hide password initially", () => {
    render(<PasswordInput {...defaultPasswordInputProps} />);

    const passwordInput = screen.getByTestId(defaultPasswordInputProps.testid!);
    const iconButton = screen.getByRole("button");

    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("type", "password");
    expect(passwordInput).toContainElement(iconButton);
    expect(iconButton).toHaveAttribute("aria-label", "Show password");
  });

  it("should toggle password visibility on click icon", () => {
    render(<PasswordInput {...defaultPasswordInputProps} />);

    const passwordInput = screen.getByTestId(defaultPasswordInputProps.testid!);
    const iconButton = screen.getByRole("button");

    userEvent.click(iconButton);

    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("type", "text");
    expect(passwordInput).toContainElement(iconButton);
    expect(iconButton).toHaveAttribute("aria-label", "Hide password");

    userEvent.click(iconButton);

    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("type", "password");
    expect(passwordInput).toContainElement(iconButton);
    expect(iconButton).toHaveAttribute("aria-label", "Show password");
  });
});
