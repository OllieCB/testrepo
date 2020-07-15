const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

// Test Tool
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
	const last = arr => arr[arr.length - 1];
	const pathToFilename = s => last(s.split('/')).split('.')[0];

	const bundleAnalyzer = env && env.bundleAnalyzer ? [
		new BundleAnalyzerPlugin(),
	] : [];

	return {
		mode: process.env.NODE_ENV,
		resolve: {
			modules: [
				'node_modules',
				'src/shared/assets',
				'src/shared/styles/base',
				'src/workwithme/common',
				'src/workwithme/assets',
			],
		},
		entry: {
			'main': './src/workwithme/scripts/index.js',
			'styles': ['./src/workwithme/styles/main.scss'],
			'styles-tablet': ['./src/workwithme/styles/main-tablet.scss'],
			'styles-desktop': ['./src/workwithme/styles/main-desktop.scss'],
			'print': ['./src/workwithme/styles/main-print.scss']
		},
		output: {
			filename: 'js/[name].js',
			path: path.resolve(__dirname, 'dist', 'WorkWithMe.Website'),
			publicPath: '/',
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'eslint-loader',
					include: [
						path.resolve(__dirname, 'src', 'workwithme'),
					],
				},
				{
					test: /\.(js|jsx)$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					include: [
						path.resolve(__dirname, 'src', 'workwithme'),
					],
				},
				{
					exclude: [
						/\.(hbs|html)$/,
						/\.js$/,
						/\.css$/,
						/\.scss$/,
						/\.json$/,
					],
					loader: 'file-loader',
					options: {
						name: 'imgs/[name].[ext]',
					},
				},
				{
					test: /\.(hbs|handlebars)$/,
					loader: 'handlebars-loader',
					query: {
						partialDirs: [
							path.join(__dirname, 'src', 'shared', 'components'),
							path.join(__dirname, 'src', 'workwithme', 'layouts'),
							path.join(__dirname, 'src', 'workwithme', 'common'),
							path.join(__dirname, 'src', 'workwithme', 'components'),
						],
						helperDirs: [
							path.join(__dirname, 'src', 'shared', 'scripts', 'helpers'),
							path.join(__dirname, 'src', 'workwithme', 'scripts', 'helpers'),
						],
					},
				},
				{
					test: /\.(css|scss|sass)$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								sourceMap: true,
								plugins: () => [
									autoprefixer({
										browsers: [
											'>1%',
										],
									}),
								],
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: false,
								includePaths: [
									'/src/workwithme/styles',
								],
							},
						},
					],
				},
				{
					test: /\.html$/,
					loader: 'html-loader',
				},
			],
		},
		plugins: [
			new StyleLintPlugin({
				syntax: 'scss',
			}),
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
		].concat(glob.sync('src/workwithme/pages/*.hbs').map(page => new HtmlWebpackPlugin({
			name: pathToFilename(page),
			filename: `${pathToFilename(page)}.html`,
			template: page,
			inject: false,
			cache: true,
			minify: {
				removeComments: false,
				collapseWhitespace: true,
				removeRedundantAttributes: false,
				useShortDoctype: false,
				removeEmptyAttributes: false,
				removeStyleLinkTypeAttributes: false,
				keepClosingSlash: true,
				minifyJS: false,
				minifyCSS: false,
				minifyURLs: false,
			},
		}))).concat(bundleAnalyzer),
		optimization: {
			minimizer: [
				new OptimizeCssAssetsPlugin({}),
				new UglifyJsPlugin({
					sourceMap: true,
					parallel: true,
				}),
			],
		},
		devtool: 'cheap-module-source-map',
		devServer: {
			contentBase: path.resolve(__dirname, 'dist', 'WorkWithMe.Website'),
			publicPath: '/',
			host: '0.0.0.0',
			public: 'localhost:9100',
			port: 9100,
			open: true,
			clientLogLevel: 'warning',
			historyApiFallback: {
				rewrites: [
					{ from: /./, to: '/404.html' },
				],
			},
			stats: 'minimal',
			overlay: true,
			staticOptions: {
				redirect: true,
				fallthrough: true,
			},
			proxy: [{
				context: [
					'/reverseGeocode',
				],
				target: 'http://localhost:5000',
			}],
		},
	};
};
