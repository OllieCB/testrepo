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
				'src/jobboard/common',
				'src/jobboard/assets',
			],
		},
		entry: {
			'main': './src/jobboard/scripts/index.js',
			'styles': ['./src/jobboard/styles/main.scss'],
			'styles-tablet': ['./src/jobboard/styles/main-tablet.scss'],
			'styles-desktop': ['./src/jobboard/styles/main-desktop.scss'],
			'print': ['./src/jobboard/styles/main-print.scss']
		},
		output: {
			filename: 'js/[name].js',
			path: path.resolve(__dirname, 'dist', 'JobBoard.Website'),
			publicPath: '/',
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'eslint-loader',
					include: [
						path.resolve(__dirname, 'src', 'jobboard'),
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
						path.resolve(__dirname, 'src', 'jobboard'),
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
							path.join(__dirname, 'src', 'jobboard', 'layouts'),
							path.join(__dirname, 'src', 'jobboard', 'common'),
							path.join(__dirname, 'src', 'jobboard', 'components'),
						],
						helperDirs: [
							path.join(__dirname, 'src', 'shared', 'scripts', 'helpers'),
							path.join(__dirname, 'src', 'jobboard', 'scripts', 'helpers'),
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
									'/src/jobboard/styles',
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
		].concat(glob.sync('src/jobboard/pages/*.hbs').map(page => new HtmlWebpackPlugin({
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
			contentBase: path.resolve(__dirname, 'dist', 'JobBoard.Website'),
			publicPath: '/',
			host: '0.0.0.0',
			public: 'localhost:9050',
			port: 9050,
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
					'/jobboard/jobs',
					'/reverseGeocode',
				],
				target: 'http://localhost:5000',
			}],
		},
	};
};
