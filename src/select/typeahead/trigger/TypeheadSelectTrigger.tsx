import "./_typehead-select-trigger.scss";

import classNames from "classnames";
import React from "react";

import ListItem from "../../../list/item/ListItem";
import Tag, {TagShape} from "../../../tag/Tag";
import Select from "../../Select";
import List from "../../../list/List";

export interface TypeheadSelectTriggerProps {
  tags: TagShape[];
  handleTagRemove: (tag: TagShape) => void;
  customClassName?: string;
  input?: React.ReactNode;
  onClick?: VoidFunction;
}
function TypeheadSelectTrigger({
  handleTagRemove,
  tags,
  customClassName,
  input,
  onClick
}: TypeheadSelectTriggerProps) {
  return (
    <Select.Trigger
      customClassName={"typeahead-select-trigger"}
      testid={"TypeaheadSelectTrigger"}
      onClick={onClick}>
      <List
        customClassName={classNames(
          "typeahead-select-trigger__tag-list",
          customClassName
        )}
        testid={"TypeaheadSelectTrigger.list"}
        items={tags}>
        {(tag: TagShape) => (
          <ListItem
            key={tag.id}
            customClassName={"typeahead-select-trigger__tag-list__item"}>
            <Tag
              onRemove={handleTagRemove}
              customClassName={"typeahead-select-trigger__tag-list__item__tag"}
              tag={tag}
            />
          </ListItem>
        )}
      </List>

      {input}
    </Select.Trigger>
  );
}

export default TypeheadSelectTrigger;
