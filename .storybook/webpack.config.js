const path = require("path");

module.exports = ({config}) => {
  // modify storybook's file-loader rule to avoid conflicts with our inline svg
  const fileLoaderRule = config.module.rules.find((rule) => rule.test.test(".svg"));
  fileLoaderRule.exclude = /\.svg$/;

  config.module.rules.push({
    test: /\.svg$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve("babel-loader")
      },
      {
        loader: require.resolve("react-svg-loader")
      }
    ]
  });

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require("@babel/preset-typescript").default,
            require("@babel/preset-react").default
          ],
          plugins: [
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-proposal-nullish-coalescing-operator"
          ]
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "sass-loader"
      }
    ],
    include: path.resolve(__dirname, "../")
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
