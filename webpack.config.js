// const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
  return {
    entry: {
      'bootstrap': './ui-src/bootstrap.js',
    },
    output: {
      path: path.join(__dirname, 'ui'),
      publicPath: '/ui',
      filename: 'lib/[name].js',
    },
    devtool: 'source-map',
    plugins: (() => {
      const plugins = [
        new ExtractTextPlugin('./css/app.css'),
      ];

      return plugins;
    })(),
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: require.resolve('html-loader'),
        },
        {
          test: /\.css$/,
          loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
          ],
          // loader: ExtractTextPlugin.extract({
          //   fallbackLoader: require.resolve('style-loader'),
          //   loader: require.resolve('css-loader'),
          // }),
        },
        {
          test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
          loader: require.resolve('url-loader'),
          query: {
            limit: 1000,
            name: './img/[name].[ext]',
          },
        },
        {
          test: /\.(woff2?|ttf|eot)(\?.*)?$/i,
          loader: require.resolve('url-loader'),
          query: {
            limit: 1000,
            name: './fonts/[name].[ext]',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          query: {
            babelrc: false,
            // plugins: [
            //   require.resolve('babel-plugin-transform-async-to-generator'),
            // ],
            // presets: [
            //   require.resolve('babel-preset-es2015'),
            //   require.resolve('babel-preset-stage-3'),
            // ],
            cacheDirectory: true,
          },
        },
        {
          test: /\.js$/,
          include: /(template-binding|xin|xin-([a-zA-Z-]+)|([a-zA-Z-]+)-helper)\//,
          loader: require.resolve('babel-loader'),
          query: {
            babelrc: false,
            // plugins: [
            //   require.resolve('babel-plugin-transform-async-to-generator'),
            // ],
            // presets: [
            //   require.resolve('babel-preset-es2015'),
            //   require.resolve('babel-preset-stage-3'),
            // ],
            cacheDirectory: true,
          },
        },
      ],
    },
    devServer: {
      proxy: {
        '/api': { target: 'http://localhost:4041' },
        '/auth': { target: 'http://localhost:4041' },
      },
    //   historyApiFallback: env.hot,
    //   inline: env.hot,
    //   hot: env.hot,
    //   host: '0.0.0.0',
    //   contentBase: (() => (env.cordova ? ['./www', './platforms/android/platform_www'] : [ './www' ]))(),
    },
  };
};
