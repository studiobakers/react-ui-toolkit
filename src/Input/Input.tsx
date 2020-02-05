import React from "react";
import classNames from "classnames";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
`;
const PrefixIcon = styled.span`
  background: white;

  border-right: 1px solid grey;
`;
const SuffixIcon = styled.span`
  background: white;

  border-left: 1px solid grey;
`;

interface InputProps {
  name: string;
  type?: string;
  value?: string;
  onChange: React.ReactEventHandler<HTMLInputElement>;
  onFocus?: React.ReactEventHandler<HTMLInputElement>;
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  role?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  inputContainerRef?: React.RefObject<HTMLDivElement>;
}

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
    prefixIcon,
    suffixIcon,
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
      {prefixIcon && (
        <PrefixIcon className={"input-container-prefix-icon"}>{prefixIcon}</PrefixIcon>
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

      {suffixIcon && (
        <SuffixIcon className={"input-container-suffix-icon"}>{suffixIcon}</SuffixIcon>
      )}
    </InputContainer>
  );
}

export default Input;
