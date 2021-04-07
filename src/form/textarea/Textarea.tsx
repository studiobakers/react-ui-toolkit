import "./_textarea.scss";

import React, {useState} from "react";
import classNames from "classnames";
import TextareaAutosize, {TextareaAutosizeProps} from "react-textarea-autosize";

import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboardEventConstants";

type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name" | "onChange" | "className"
> & {
  name: string;
  onChange: React.ReactEventHandler<HTMLTextAreaElement>;
  value?: string;
  testid?: string;
  isDisabled?: boolean;
  customClassNames?: {
    container?: string;
    textarea?: string;
  };
  style?: React.CSSProperties;
  autoSizeProps?: TextareaAutosizeProps;
  onJustEnterPressed?: () => void;
  onShiftEnter?: () => void;
  isRequired?: boolean;
  hasError?: boolean;
};

function Textarea(props: TextareaProps) {
  const {
    name,
    value,
    onChange,
    placeholder,
    isDisabled,
    onFocus,
    customClassNames,
    onBlur,
    testid,
    onKeyUp,
    id,
    style,
    autoSizeProps,
    onJustEnterPressed,
    isRequired,
    onShiftEnter,
    maxLength,
    hasError,
    autoComplete = "off",
    autoCorrect = "off",
    autoFocus = false,
    ...otherProps
  } = props;
  const [isShiftPressed, setShiftPressedState] = useState(false);
  const containerClassName = classNames(
    "textarea-container",
    customClassNames?.container
  );
  const textareaClassName = classNames("textarea", customClassNames?.textarea, {
    "textarea--has-error": hasError
  });

  return (
    <div className={containerClassName}>
      {autoSizeProps ? (
        <TextareaAutosize
          className={textareaClassName}
          data-testid={testid}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          style={autoSizeProps.style}
          maxRows={autoSizeProps.maxRows}
          minRows={autoSizeProps.minRows}
          onHeightChange={autoSizeProps.onHeightChange}
          required={isRequired}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
      ) : (
        <textarea
          className={textareaClassName}
          data-testid={testid}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          style={style}
          required={isRequired}
          maxLength={maxLength}
          autoFocus={autoFocus}
          {...otherProps}
        />
      )}
    </div>
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const {key: pressedKey} = event;
    const {onKeyDown} = props;
    const newEvent = {...event};

    newEvent.currentTarget.name = name;

    if (pressedKey === KEYBOARD_EVENT_KEY.ENTER) {
      if (!isShiftPressed && onJustEnterPressed) {
        event.preventDefault();
        onJustEnterPressed();
      } else if (isShiftPressed && onShiftEnter) {
        event.preventDefault();
        onShiftEnter();
      }
    } else if (pressedKey === KEYBOARD_EVENT_KEY.SHIFT) {
      setShiftPressedState(true);
    }

    if (onKeyDown) {
      onKeyDown(newEvent);
    }
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const {key: pressedKey} = event;

    if (pressedKey === KEYBOARD_EVENT_KEY.SHIFT) {
      setShiftPressedState(false);
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  }
}

export default Textarea;
