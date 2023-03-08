/**
 * Returns a negated function that invokes the passed in function and returns the logical negation of its return value.
 * @param {function} fn A function
 * @returns {function} Negated function
 */
declare function not(fn: (item: any) => boolean): (item: any) => boolean;
export { not };
