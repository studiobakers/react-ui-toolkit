import "./_typeahead-list.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

import ListItem from "../../../list/item/ListItem";
import Tag, {TagShape} from "../../../tag/Tag";

export interface TypeaheadListProps {
  tags: TagShape[];
  handleTagRemove: (tag: TagShape) => void;
  customClassName?: string;
  input?: React.ReactNode;
}

function TypeaheadList({
  tags,
  customClassName,
  handleTagRemove,
  input
}: TypeaheadListProps) {
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

export default TypeaheadList;
