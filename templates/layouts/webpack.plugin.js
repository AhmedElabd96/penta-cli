const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // <-- 1. Import the new CSS minimizer

const isProduction = process.env.NODE_ENV === 'production';
const OUTPUT_PATH = (process.env.OUTPUT_PATH && path.resolve(process.env.OUTPUT_PATH)) || path.join(__dirname, 'dist/build');
const ASSET_PATH = process.env.ASSET_PATH || '/';
const KEYCLOAK_URL = process.env.KEYCLOAK_URL || '/';

module.exports = [
  {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: './src/index.js',
    devServer: {
      port: 3002,
      host: 'localhost',
      static: OUTPUT_PATH,
      historyApiFallback: true,
      hot: true,
      allowedHosts: 'all',
      devMiddleware: {
        writeToDisk: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
      },
      client: {
        logging: 'verbose',
        overlay: false,
      },
    },
    output: {
      filename: '${projectName}.js',
      path: OUTPUT_PATH,
      publicPath: ASSET_PATH,
      library: {
        name: '${projectName}',
        type: 'umd',
        umdNamedDefine: true,
      },
      clean: true,
    },


    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: (resourcePath) => {
                    // Disable CSS modules for global styles
                    return !resourcePath.includes('/src/assets/css/') && !resourcePath.endsWith('.scss');
                  },
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                },
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: {
                    'postcss-prefix-selector': {
                      prefix: '.${projectName}',
                      exclude: [':root', '[dir=rtl]'],
                      ignoreFiles: [],
                      transform(prefix, selector, prefixedSelector, filePath, rule) {
                        if (selector.match(/^(html|body)/)) {
                          return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
                        }
                        const annotation = rule.prev();
                        if (annotation && annotation.type === 'comment' && annotation.text.trim() === 'no-prefix') {
                          return selector;
                        }
                        return prefixedSelector;
                      },
                    },
                  },
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/,
          type: 'asset/resource',
          generator: { filename: '[name][ext]' },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
          generator: {
            filename: (pathData) => {
              const relativePath = pathData.filename.replace('src/assets/', '');
              return `assets/${relativePath}`;
            }
          },
        },
      ],
    },

    externals: {
      'react': { root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react' },
      'react-dom': { root: 'ReactDOM', commonjs2: 'react-dom', commonjs: 'react-dom', amd: 'react-dom' },
      'redux': { root: 'Redux', commonjs2: 'redux', commonjs: 'redux', amd: 'redux' },
      'react-redux': { root: 'ReactRedux', commonjs2: 'react-redux', commonjs: 'react-redux', amd: 'react-redux' },
      '@penta-b/chakra-ui': {
        root: 'PentaChakraUI',
        commonjs2: '@penta-b/chakra-ui',
        commonjs: '@penta-b/chakra-ui',
        amd: '@penta-b/chakra-ui'
      },
      '@penta-b/gridx': {
        root: 'PentaGrid',
        commonjs2: '@penta-b/gridx',
        commonjs: '@penta-b/gridx',
        amd: '@penta-b/gridx'
      },
      '@penta-b/ma-lib': '@penta-b/ma-lib',
      '@penta-b/ma-lib-layout': '@penta-b/ma-lib-layout',
      '@penta-b/mna-penta-smart-forms': '@penta-b/mna-penta-smart-forms'
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'test-data', to: 'test-data' },
          { from: 'public/css', to: 'css' },
          { from: "public/fonts", to: "fonts" }
        ],
      }),
      new DefinePlugin({
        'process.env.KEYCLOAK_URL': JSON.stringify(KEYCLOAK_URL),
      })
    ].filter(Boolean),

    optimization: {
      minimize: isProduction, // Only minimize in production
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(), // Add the CSS minimizer
      ]
    },
  }
];