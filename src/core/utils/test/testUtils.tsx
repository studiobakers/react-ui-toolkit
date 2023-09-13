import {axe, toHaveNoViolations} from "jest-axe";

expect.extend(toHaveNoViolations);

/**
 * Validates against common a11y mistakes.
 *
 * @example
 * ```
 * it('passes a11y test', async () => {
 *  await testA11Y(<MyComponent />, options);
 * });
 *
 * ```
 * @param {HTMLElement} container - The html element we want to test
 * @param {RunOptions} options - Axe run options
 * @returns {void}
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
async function testA11y(container: HTMLElement, options?: Parameters<typeof axe>[1]) {
  const results = await axe(container, options);

  expect(results).toHaveNoViolations();
}

export {testA11y};
