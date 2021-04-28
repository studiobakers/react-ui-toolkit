import React from "react";
import classNames from "classnames";

import Spinner from "../spinner/Spinner";

// SCSS import is moved here to be able to override spinner styles without nesting
import "./_button.scss";

export interface ButtonProps {
  testid?: string;
  children: React.ReactNode;
  onClick?: React.ReactEventHandler<HTMLButtonElement>;
  onMouseOver?: React.ReactEventHandler<HTMLButtonElement>;
  onMouseDown?: React.ReactEventHandler<HTMLButtonElement>;
  onMouseUp?: React.ReactEventHandler<HTMLButtonElement>;
  onFocus?: React.ReactEventHandler<HTMLButtonElement>;
  onBlur?: React.ReactEventHandler<HTMLButtonElement>;
  id?: string;
  lang?: string;
  type?: "button" | "submit" | "reset";
  shouldDisplaySpinner?: boolean;
  isDisabled?: boolean;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  shouldFocus?: boolean;
  ariaLabel?: string;
  customClassName?: string;
  tabIndex?: number;
}

function Button({
  testid,
  type = "button",
  id,
  lang,
  onClick,
  children,
  customClassName,
  shouldPreventDefault = true,
  shouldStopPropagation = true,
  shouldFocus,
  shouldDisplaySpinner,
  ariaLabel,
  isDisabled,
  onMouseOver,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  tabIndex
}: ButtonProps) {
  const isButtonDisabled = Boolean(isDisabled || shouldDisplaySpinner);
  const containerClassName = classNames("button", customClassName, {
    "button--is-inactive": isButtonDisabled
  });

  return (
    <button
      id={id}
      data-testid={testid}
      tabIndex={tabIndex}
      className={containerClassName}
      type={type}
      lang={lang}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={shouldFocus}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onFocus={handleFocus}
      onBlur={onBlur}
      disabled={isButtonDisabled}
      aria-label={ariaLabel}>
      {children}

      {shouldDisplaySpinner && (
        <div className={"button__spinner-container"}>
          <Spinner
            customClassName={"button__spinner"}
            aria-label={"Button spinner visible. Button inactivated."}
          />
        </div>
      )}
    </button>
  );

  function handleClick(event: React.SyntheticEvent<HTMLButtonElement>) {
    if (onClick) {
      if (shouldPreventDefault) {
        event.preventDefault();
      }

      if (shouldStopPropagation) {
        event.stopPropagation();
      }

      if (!isButtonDisabled) {
        onClick(event);
      }
    }
  }

  function handleMouseOver(event: React.SyntheticEvent<HTMLButtonElement>) {
    if (onMouseOver) {
      onMouseOver(event);
    }
  }

  function handleFocus(event: React.SyntheticEvent<HTMLButtonElement>) {
    if (onFocus) {
      onFocus(event);
    }
  }
}

export default Button;
