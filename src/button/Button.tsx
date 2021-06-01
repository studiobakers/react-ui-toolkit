import React from "react";
import classNames from "classnames";

import Spinner from "../spinner/Spinner";

// SCSS import is moved here to be able to override spinner styles without nesting
import "./_button.scss";

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & {
  children: React.ReactNode;
  testid?: string;
  customSpinner?: React.ReactNode;
  isDisabled?: boolean;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  shouldFocus?: boolean;
  onClick?: React.ReactEventHandler<HTMLButtonElement>;
  onMouseOver?: React.ReactEventHandler<HTMLButtonElement>;
  onMouseDown?: React.ReactEventHandler<HTMLButtonElement>;
  onMouseUp?: React.ReactEventHandler<HTMLButtonElement>;
  onFocus?: React.ReactEventHandler<HTMLButtonElement>;
  onBlur?: React.ReactEventHandler<HTMLButtonElement>;
  id?: string;
  ref?: React.RefObject<HTMLButtonElement>;
  lang?: string;
  shouldDisplaySpinner?: boolean;
  ariaLabel?: string;
  customClassName?: string;
  tabIndex?: number;
};

const Button = React.forwardRef<HTMLButtonElement, Record<string, any>>(
  // eslint-disable-next-line prefer-arrow-callback
  function ButtonComponent(props: ButtonProps) {
    const {
      testid,
      type = "button",
      id,
      ref,
      lang,
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
      onMouseOver,
      onMouseDown,
      onMouseUp,
      onFocus,
      onBlur,
      tabIndex
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

        {shouldDisplaySpinner && spinnerContent}
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
);

export default Button;
