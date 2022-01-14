import {v4 as uuidv4} from "uuid";

import {ListProps} from "../List";

function generateListItemKey<Item = any>({
  listItemKeyGenerator,
  listItemTestId,
  item
}: {
  listItemKeyGenerator: ListProps["listItemKeyGenerator"];
  listItemTestId: string;
  item: Item;
}) {
  let key = uuidv4();

  if (listItemKeyGenerator) {
    key = listItemKeyGenerator(item, listItemTestId);
    // @ts-ignore
  } else if (item && typeof item === "object" && item.id) {
    // @ts-ignore
    key = item.id;
  }

  return key;
}

export {generateListItemKey};
