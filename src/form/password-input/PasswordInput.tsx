import "./_password-input.scss";

import React, {useState} from "react";
import classNames from "classnames";

import Input from "../input/Input";
import {InputProps} from "../input/util/inputTypes";
import Button from "../../button/Button";

export interface PasswordInputProps extends Omit<InputProps, "leftIcon" | "rightIcon"> {
  hideIcon?: React.ReactNode;
  revealIcon?: React.ReactNode;
}

function PasswordInput({
  testid,
  name,
  value,
  onChange,
  hasError,
  placeholder,
  customClassName,
  hideIcon,
  revealIcon
}: PasswordInputProps) {
  const [isPasswordShown, setPasswordVisibility] = useState(false);
  const passwordInputIconClassName = classNames("password-input__icon", {
    "password-input__icon--is-visible": Boolean(value)
  });
  const passwordInputClassName = classNames("password-input", customClassName);
  let iconAriaLabel = "Show password";
  let icon = revealIcon;
  let inputType: "password" | "text" = "password";

  if (isPasswordShown) {
    iconAriaLabel = "Hide password";
    icon = hideIcon;
    inputType = "text";
  }

  return (
    <Input
      testid={testid}
      type={inputType}
      name={name}
      customClassName={passwordInputClassName}
      value={value}
      hasError={hasError}
      placeholder={placeholder}
      onChange={onChange}
      rightIcon={
        revealIcon &&
        hideIcon && (
          <Button
            testid={`${testid}-password-visibility-icon`}
            customClassName={passwordInputIconClassName}
            aria-label={iconAriaLabel}
            onClick={togglePasswordVisibility}
            shouldStopPropagation={false}
            shouldPreventDefault={false}
          >
            {icon}
          </Button>
        )
      }
    />
  );

  function togglePasswordVisibility() {
    setPasswordVisibility(!isPasswordShown);
  }
}

export default PasswordInput;
