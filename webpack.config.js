const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build|coverage|dist|test)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0'],
          },
        },
      },
    ],
  },
  entry: './src/index.js',
  output: {
    filename: 'dist/scribe-hexmap-generator.min.js',
  },
};
