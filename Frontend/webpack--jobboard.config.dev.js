const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { default: GenerateVersionFileWebpackPlugin } = require('extract-hash-webpack-plugin');

// Test Tool
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
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
			filename: 'js/[name].[hash:5].js',
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
						path.resolve(__dirname, 'src', 'shared'),
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
						path.resolve(__dirname, 'src', 'shared'),
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
				filename: 'css/[name].[hash:5].css',
			}),
			new GenerateVersionFileWebpackPlugin({
				dest: 'dist/Jobboard.Website/App_Config/Include/Project/Jobboard',
				filename: 'Jobboard.Website.Frontend.config',
				hashLength: 5,
				fn: hash =>
					`<?xml version="1.0" encoding="utf-8" ?><configuration><sitecore><settings><setting name="JobBoard.Website.Frontend.Hash"  value="${hash}" /></settings></sitecore></configuration>`,
			}),
		].concat(bundleAnalyzer),
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
	};
};
