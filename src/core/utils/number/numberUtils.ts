/**
 * @param {number} limit The number of digits in decimal part of a number
 * @return {function} A function that takes in a number and returns the truncated version of it
 */
function truncateDecimalPart(limit: number) {
  return (x: number) => {
    let finalNumber = x || 0;

    if (!isInteger(finalNumber)) {
      finalNumber = parseFloat(finalNumber.toFixed(limit));
    }

    return finalNumber;
  };
}

/**
 * @param {number} x number to check
 * @return {boolean} Whether x is an integer or not
 */
function isInteger(x: number): boolean {
  return String(x).split(".")[1] === undefined;
}

export {truncateDecimalPart, isInteger};
