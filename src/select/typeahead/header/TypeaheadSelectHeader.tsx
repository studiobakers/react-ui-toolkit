import "./_typeahead-select-header.scss";

import React from "react";
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
  return (
    <ul className={classNames("typeahead-select-header__tag-list", customClassName)}>
      {tags.map((tag: TagShape) => (
        <ListItem
          key={tag.id}
          customClassName={"typeahead-select-header__tag-list__item"}>
          <Tag
            onRemove={handleTagRemove}
            customClassName={"typeahead-select-header__tag-list__item__tag"}
            tag={tag}
          />
        </ListItem>
      ))}

      <li>{input}</li>
    </ul>
  );
}

export default TypeaheadSelectHeader;
