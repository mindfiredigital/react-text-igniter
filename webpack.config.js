const path = require('path');

module.exports = {
  entry: 'component/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'RichTextEditor',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};