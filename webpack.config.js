// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  // target: "web",
  // externals: {
  //   bufferutil: "buffer",
  //   "utf-8-validate": "utf-8-validate",
  // },
  stats: {
    children: true
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main_bundle.js'
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/

    // new HtmlWebpackPlugin({
    //   template: "./src/components/templates/",
    // }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.node$/,
      //   loader: "node-loader",
      // },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      }
    ]
    // Add your rules for custom modules here
    // Learn more about loaders from https://webpack.js.org/loaders/

  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());

    config.resolve = {
      fallback: {
        tls: false,
        dns: false,
        module: false,
        constants: require.resolve('constants-browserify'),
        async_hooks: false, //npm i async-hook-browser
        net: require.resolve('net-browserify'),
        child_process: false,
        "fs/promises": false,
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        fs: require.resolve('browserify-fs'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        vm: require.resolve('vm-browserify'),
        readline: require.resolve('readline-browserify'),
        http: require.resolve('stream-http'),
        crypto: require.resolve('crypto-browserify')
      }
    }

  } else {
    config.mode = "development";
  }
  return config;
};