import "./_typeahead-select-header.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

import ListItem from "../../../list/item/ListItem";
import Tag, {TagShape} from "../../../tag/Tag";

export interface TypeaheadSelectHeaderProps {
  tags: TagShape[];
  handleTagRemove: (tag: TagShape) => void;
  customClassName?: string;
  input?: React.ReactNode;
}

function TypeaheadSelectHeader({
  tags,
  customClassName,
  handleTagRemove,
  input
}: TypeaheadSelectHeaderProps) {
  const listClassName = classNames("typeahead-select__header-list", customClassName);

  return (
    <ul className={listClassName}>
      {tags.map((tag: TagShape) => (
        <Fragment key={tag.id}>
          <ListItem customClassName={"typeahead-select__header-list__item"}>
            <Tag
              onRemove={handleTagRemove}
              customClassName={"typeahead-select__tag"}
              tag={tag}
            />
          </ListItem>
        </Fragment>
      ))}

      <Fragment>{input}</Fragment>
    </ul>
  );
}

export default TypeaheadSelectHeader;
