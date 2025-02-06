const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
    },
  },
  plugins: [new NodePolyfillPlugin()],
};
