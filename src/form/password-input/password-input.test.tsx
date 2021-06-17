import React from "react";
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

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
    const {getByTestId} = render(<PasswordInput {...defaultPasswordInputProps} />);

    const passwordInput = document.getElementsByTagName("input")[0];
    const iconButton = getByTestId(
      `${defaultPasswordInputProps.testid!}-password-visibility-icon`
    );

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(getByTestId(defaultPasswordInputProps.testid!)).toContainElement(
      getByTestId("password-input.reveal")
    );
    expect(iconButton).toHaveAttribute("aria-label", "Show password");
  });

  it("should toggle password visibility on click icon", () => {
    const {getByTestId} = render(<PasswordInput {...defaultPasswordInputProps} />);

    const passwordInput = document.getElementsByTagName("input")[0];
    const iconButton = getByTestId(
      `${defaultPasswordInputProps.testid!}-password-visibility-icon`
    );

    fireEvent.click(iconButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(getByTestId(defaultPasswordInputProps.testid!)).toContainElement(
      getByTestId("password-input.hide")
    );
    expect(iconButton).toHaveAttribute("aria-label", "Hide password");

    fireEvent.click(iconButton);

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(getByTestId(defaultPasswordInputProps.testid!)).toContainElement(
      getByTestId("password-input.reveal")
    );
    expect(iconButton).toHaveAttribute("aria-label", "Show password");
  });
});
