declare function filterOutItemsByKey<T extends {
    [x: string]: any;
}>(array: T[], key: keyof T, items: T[]): T[];
declare function updateAtIndex<Item>(items: Item[], index: number, newItem: Item): Item[];
/**
 * Slices an array at an offset from the end so that the new array's length would be `limit` at most.
 *
 * @param limit - Limit for the length of that array
 * @param array - List of items
 * @returns The same array if array.length <=limit, otherwise returns a new array.
 */
declare function limitArrayLengthFromTheEnd<Item extends any>(limit: undefined | number, array: Item[]): Item[];
export { filterOutItemsByKey, updateAtIndex, limitArrayLengthFromTheEnd };
