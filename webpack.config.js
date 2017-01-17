// const webpack = require('webpack');
const path = require('path');

module.exports = function (env) {
  return {
    entry: {
      'bootstrap': './src/bootstrap.js',
    },
    output: {
      path: path.join(__dirname, 'ui'),
      publicPath: '/ui',
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          query: {
            babelrc: false,
            plugins: [
              // require.resolve('babel-plugin-transform-remove-strict-mode'),
              require.resolve('babel-plugin-transform-async-to-generator'),
            ],
            // presets: [
            //   require.resolve('babel-preset-es2015'),
            //   // require.resolve('babel-preset-stage-3'),
            // ],
            cacheDirectory: true,
          },
        },
      ],
    },
  };
};
