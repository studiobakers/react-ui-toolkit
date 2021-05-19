module.exports = {
  // The root of source code
  // `<rootDir>` is a token Jest substitutes
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/src/core/utils/test/__mocks__/styleMock.ts",
    "\\.svg$": "<rootDir>/src/core/utils/test/__mocks__/svgrMock.ts"
  },

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
