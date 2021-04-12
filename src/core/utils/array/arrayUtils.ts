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

export {filterOutItemsByKey};
