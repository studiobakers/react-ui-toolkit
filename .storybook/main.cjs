const path = require("path");

module.exports = {
  core: {builder: "webpack5"},
  stories: ["../stories/*.stories.@(js|jsx|ts|tsx|mdx)"],
  framework: "@storybook/react",
  features: {postcss: false},
  addons: ["@storybook/addon-essentials", "@storybook/preset-scss"]
};
