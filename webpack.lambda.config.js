const path = require('path')

module.exports = {  
  entry: './src/api/LambdaServer.ts',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  stats: {
    errorDetails: false,
  },
  devtool: 'source-map',
  target: 'node14.18',  
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@api': path.resolve(__dirname, 'src', 'api'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@domain': path.resolve(__dirname, 'src', 'domain'),
      '@crosscutting': path.resolve(__dirname, 'src', 'infra', 'crosscutting'),
      '@modules': path.resolve(__dirname, 'src', 'infra', 'modules'),
      '~': path.resolve(__dirname, './'),
    },
  },
  plugins: [

  ],
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
