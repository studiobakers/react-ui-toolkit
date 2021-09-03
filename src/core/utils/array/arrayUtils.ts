import {isNonNegativeInteger} from "../number/numberUtils";

function filterOutItemsByKey<T extends {[x: string]: any}>(
  array: T[],
  key: keyof T,
  items: T[]
): T[] {
  const itemsToFilterOut = items.map((item) => item[key]);

  return array.reduce<T[]>((finalArray, item) => {
    if (!itemsToFilterOut.includes(item[key])) {
      finalArray.push(item);
    }

    return finalArray;
  }, []);
}

function updateAtIndex<Item>(items: Item[], index: number, newItem: Item): Item[] {
  const newItems = [...items];

  newItems.splice(index, 1, newItem);

  return newItems;
}

/**
 * Slices an array at an offset from the end so that the new array's length would be `limit` at most.
 *
 * @param limit - Limit for the length of that array
 * @param array - List of items
 * @returns The same array if array.length <=limit, otherwise returns a new array.
 */
function limitArrayLengthFromTheEnd<Item extends any>(
  limit: undefined | number,
  array: Item[]
): Item[] {
  let slicedArray = array;

  if (isNonNegativeInteger(limit) && array.length > limit) {
    slicedArray = array.slice(-limit);
  }

  return slicedArray;
}

export {filterOutItemsByKey, updateAtIndex, limitArrayLengthFromTheEnd};
