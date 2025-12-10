const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const OUTPUT_PATH =
	(process.env.OUTPUT_PATH && path.resolve(process.env.OUTPUT_PATH)) ||
	path.join(__dirname, 'dist/build');
const NODE_ENV = process.env.NODE_ENV || 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';
const IS_PRODUCTION = NODE_ENV === 'production';

module.exports = {
	mode: NODE_ENV,
	devtool: IS_PRODUCTION ? false : 'inline-source-map',
	entry: './src/index.ts',
	output: {
		filename: '${projectName}.js',
		path: OUTPUT_PATH,
		publicPath: ASSET_PATH,
		libraryTarget: 'umd',
		library: '${projectName}',
		clean: true,
	},
	devServer: {
		port: 3001,
		static: {
			directory: OUTPUT_PATH,
		},
		hot: true,
		liveReload: true,
		historyApiFallback: true,
		allowedHosts: ["all"],
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': '*',
		},
		devMiddleware: {
			writeToDisk: true,
		},
		client: {
			logging: "verbose",
			overlay: false,
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]',
				},
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
			{
				test: /\.svg$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/icons/[name][ext]',
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	externals: {
		'react': { root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react' },
		'redux': { root: 'Redux', commonjs2: 'redux', commonjs: 'redux', amd: 'redux' },
		'react-redux': { root: 'ReactRedux', commonjs2: 'react-redux', commonjs: 'react-redux', amd: 'react-redux' },
		'@penta-b/chakra-ui': { root: 'PentaChakraUI', commonjs2: '@penta-b/chakra-ui', commonjs: '@penta-b/chakra-ui', amd: '@penta-b/chakra-ui' },
		'@penta-b/ma-lib': '@penta-b/ma-lib',
	},
	optimization: {
		minimize: IS_PRODUCTION,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						// Remove console.log in production
						drop_console: true,
						drop_debugger: true,
						// More aggressive optimizations
						pure_funcs: ['console.info', 'console.debug', 'console.warn'],
						passes: 2,
					},
					mangle: {
						// Keep class names for external usage (UMD library)
						keep_classnames: true,
						keep_fnames: false,
					},
					format: {
						// Preserve license comments
						comments: /^\**!|@preserve|@license|@cc_on/i,
						// Better output formatting
						ascii_only: true,
					},
				},
				extractComments: false,
				parallel: true,
			}),
		],
		splitChunks: false,
		runtimeChunk: false,
		usedExports: true,
		sideEffects: true,
	},
	performance: {
		hints: IS_PRODUCTION ? 'warning' : false,
		maxAssetSize: 512000,
		maxEntrypointSize: 512000,
	},
	plugins: [
		!IS_PRODUCTION &&
			new CopyPlugin({
				patterns: [
					{
						from: 'test-data',
						to: 'test-data',
					},
				],
			}),
	].filter(Boolean),
};
