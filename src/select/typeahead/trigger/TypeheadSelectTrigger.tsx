import "./_typehead-select-trigger.scss";

import classNames from "classnames";
import React from "react";

import ListItem from "../../../list/item/ListItem";
import Tag, {TagShape} from "../../../tag/Tag";
import Select from "../../Select";

export interface TypeheadSelectTriggerProps {
  tags: TagShape[];
  handleTagRemove: (tag: TagShape) => void;
  customClassName?: string;
  input?: React.ReactNode;
}
function TypeheadSelectTrigger({
  handleTagRemove,
  tags,
  customClassName,
  input
}: TypeheadSelectTriggerProps) {
  return (
    <Select.Trigger customClassName={"typeahead-select-trigger"}>
      <ul className={classNames("typeahead-select-trigger__tag-list", customClassName)}>
        {tags.map((tag: TagShape) => (
          <ListItem
            key={tag.id}
            customClassName={"typeahead-select-trigger__tag-list__item"}>
            <Tag
              onRemove={handleTagRemove}
              customClassName={"typeahead-select-trigger__tag-list__item__tag"}
              tag={tag}
            />
          </ListItem>
        ))}

        {input}
      </ul>
    </Select.Trigger>
  );
}

export default TypeheadSelectTrigger;
