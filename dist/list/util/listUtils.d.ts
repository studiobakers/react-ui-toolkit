import { ListProps } from "../List";
declare function generateListItemKey<Item = any>({ listItemKeyGenerator, listItemTestId, item }: {
    listItemKeyGenerator: ListProps["listItemKeyGenerator"];
    listItemTestId: string;
    item: Item;
}): any;
export { generateListItemKey };
