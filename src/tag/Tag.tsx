import CloseIcon from "../ui/icons/close.svg";

import React from "react";
import classNames from "classnames";

import Button from "../button/Button";

// SCSS import is moved here to override Button styles without nesting
import "./_tag.scss";

export interface TagShape<Context = any> {
  id: string;
  content: React.ReactNode;
  context?: Context;
}

interface TagProps {
  tag: TagShape;
  testid?: string;
  customClassName?: string;
  onRemove?: (tag: TagShape) => void;
}

function Tag({testid, tag, onRemove, customClassName}: TagProps) {
  const containerClassName = classNames("tag", customClassName, {
    "tag--is-removable": onRemove
  });

  return (
    <Button
      testid={testid}
      customClassName={containerClassName}
      onClick={handleRemove}
      shouldStopPropagation={true}>
      <div className={"tag__body"}>{tag.content}</div>

      {onRemove && (
        <CloseIcon
          // @ts-ignore
          className={"tag__close-icon"}
          aria-hidden={true}
        />
      )}
    </Button>
  );

  function handleRemove() {
    if (onRemove) {
      onRemove(tag);
    }
  }
}

export default Tag;
