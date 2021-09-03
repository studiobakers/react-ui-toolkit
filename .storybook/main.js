module.exports = {
  stories: ["../stories/*.stories.tsx"],
  addons: ["@storybook/addon-actions/register", "@storybook/addon-links/register"],
  features: {
    postcss: false // do not use the built-in postcss
  }
};
