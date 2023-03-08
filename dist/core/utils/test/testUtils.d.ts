import { axe } from "jest-axe";
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
declare function testA11y(container: HTMLElement, options?: Parameters<typeof axe>[1]): Promise<void>;
export { testA11y };
