import CloseIcon from "../ui/icons/close.svg";

import "./_tag.scss";

import React from "react";
import classNames from "classnames";

import Button from "../button/Button";

export interface TagShape<Context = any> {
  id: string;
  content: React.ReactNode;
  context?: Context;
}

interface TagProps {
  testid?: string;
  tag: TagShape;
  customClassName?: string;
  onRemove?: (tag: TagShape) => void;
}

function Tag({testid, tag, onRemove, customClassName}: TagProps) {
  const containerClassName = classNames("tag-container", customClassName);

  return (
    <Button
      testid={`${testid}.remove-button`}
      customClassName={containerClassName}
      onClick={handleRemove}
      shouldStopPropagation={true}>
      <div className={"tag-body"}>{tag.content}</div>

      <CloseIcon aria-hidden={true} />
    </Button>
  );

  function handleRemove() {
    onRemove!(tag);
  }
}

export default Tag;
