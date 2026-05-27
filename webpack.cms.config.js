const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './admin/src/cms-entry.js',
  output: {
    path: path.resolve(__dirname, 'admin/dist'),
    filename: 'cms-bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './admin/src/index-template.html',
      filename: 'index.html',
      inject: false,
    }),
  ],
};
