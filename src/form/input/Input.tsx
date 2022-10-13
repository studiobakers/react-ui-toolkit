import "./_input.scss";

import React from "react";
import classNames from "classnames";

import {InputProps} from "./util/inputTypes";

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    testid,
    type = "text",
    isDisabled,
    hasError,
    customClassName,
    leftIcon,
    rightIcon,
    role,
    autoComplete = "off",
    autoCorrect = "off",
    ...rest
  } = props;
  const inputContainerClassName = classNames(
    "input-container",
    customClassName,
    `input-container--type-${type}`,
    {
      "input-container--is-disabled": isDisabled,
      "input-container--has-error": hasError
    }
  );

  return (
    <div role={role} className={inputContainerClassName} data-testid={testid}>
      {leftIcon && (
        <span className={"input-container__icon input-container__left-icon"}>
          {leftIcon}
        </span>
      )}

      <input
        ref={ref}
        className={"input"}
        type={type}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={isDisabled}
        {...rest}
      />

      {rightIcon && (
        <span className={"input-container__icon input-container__right-icon"}>
          {rightIcon}
        </span>
      )}
    </div>
  );
});

export default Input;
