const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // main bundle/dependency graph
  entry: {
    rhino: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: true
  },
  module: {
    // compile file types
    rules: [
      // scripts
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // styles
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Rhino Software Inc.",
      filename: 'index.html',
      template: path.resolve(__dirname, './src/template.html')
    })
  ],
  performance: {
    maxAssetSize: 500000
  }
}
