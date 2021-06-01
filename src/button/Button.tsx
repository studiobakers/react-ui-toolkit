import React from "react";
import classNames from "classnames";

import Spinner from "../spinner/Spinner";

// SCSS import is moved here to be able to override spinner styles without nesting
import "./_button.scss";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> & {
  children: React.ReactNode;
  testid?: string;
  customSpinner?: React.ReactNode;
  isDisabled?: boolean;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  shouldFocus?: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
  shouldDisplaySpinner?: boolean;
  ariaLabel?: string;
  customClassName?: string;
};

const Button = React.forwardRef<HTMLButtonElement, Record<string, any>>(
  // eslint-disable-next-line prefer-arrow-callback
  function ButtonComponent(props: ButtonProps, ref) {
    const {
      testid,
      type = "button",
      onClick,
      children,
      customSpinner,
      customClassName,
      shouldPreventDefault = true,
      shouldStopPropagation = true,
      shouldFocus,
      shouldDisplaySpinner,
      ariaLabel,
      isDisabled,
      ...rest
    } = props;
    const isButtonDisabled = Boolean(isDisabled || shouldDisplaySpinner);
    const containerClassName = classNames("button", customClassName, {
      "button--is-inactive": isButtonDisabled
    });
    const spinnerContent = customSpinner || (
      <div className={"button__spinner-container"}>
        <Spinner
          customClassName={"button__spinner"}
          aria-label={"Button spinner visible. Button inactivated."}
        />
      </div>
    );

    return (
      <button
        ref={ref}
        data-testid={testid}
        className={containerClassName}
        type={type}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={shouldFocus}
        onClick={handleClick}
        disabled={isButtonDisabled}
        aria-label={ariaLabel}
        {...rest}>
        {children}

        {shouldDisplaySpinner && spinnerContent}
      </button>
    );

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
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
  }
);

export default Button;
