import { resolve as _resolve } from 'path';
import { ProvidePlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: _resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    }),
    new Dotenv()  // Add this line
  ]
};

export default config;
