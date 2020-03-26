import React from "react";
import classNames from "classnames";
import styled from "styled-components";

type InputType = "text" | "email" | "password" | "number" | "hidden" | "url";

interface InputProps {
  name: string;
  onChange: React.ReactEventHandler<HTMLInputElement>;
  type?: InputType;
  value?: string;
  onFocus?: React.ReactEventHandler<HTMLInputElement>;
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  role?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  inputContainerRef?: React.RefObject<HTMLDivElement>;
}

const InputContainer = styled.div`
  display: flex;
`;
const LeftIcon = styled.span`
  background: white;

  border-right: 1px solid grey;
`;
const RightIcon = styled.span`
  background: white;

  border-left: 1px solid grey;
`;

function Input(props: InputProps) {
  const {
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    step,
    min,
    max,
    isDisabled,
    onFocus,
    className,
    onBlur,
    onKeyUp,
    onKeyDown,
    leftIcon,
    rightIcon,
    role,
    inputContainerRef,
    ...rest
  } = props;
  const inputContainerClassName = classNames("input-container", className);
  const inputClassName = classNames("input", {
    disabled: isDisabled
  });

  return (
    <InputContainer
      ref={inputContainerRef}
      role={role}
      className={inputContainerClassName}>
      {leftIcon && (
        <LeftIcon className={"input-container-left-icon"}>{leftIcon}</LeftIcon>
      )}

      <input
        className={inputClassName}
        name={name}
        type={type}
        step={step}
        max={max}
        min={min}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={"off"}
        autoCorrect={"off"}
        disabled={isDisabled}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        {...rest}
      />

      {rightIcon && (
        <RightIcon className={"input-container-right-icon"}>{rightIcon}</RightIcon>
      )}
    </InputContainer>
  );
}

export default Input;
