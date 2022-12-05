const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  devtool: false,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                version: "2022-03"
              }
            ]
          ]
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      shared: [
        'react',
        'react-dom',
        {
          '@shared-context/shared-library': {
            import: '@shared-context/shared-library',
            requiredVersion: require('../shared-library/package.json').version,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
