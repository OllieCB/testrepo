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
				'src/scope/common',
				'src/scope/assets',
				'src/scope/styles/base',
			],
		},
		entry: {
			'main': './src/scope/scripts/index.js',
			'styles': ['./src/scope/styles/main.scss'],
			'styles-tablet': ['./src/scope/styles/main-tablet.scss'],
			'styles-desktop': ['./src/scope/styles/main-desktop.scss'],
			'print': ['./src/scope/styles/main-print.scss']
		},
		output: {
			filename: 'js/[name].[hash:5].js',
			path: path.resolve(__dirname, 'dist', 'Scope.Website'),
			publicPath: '/',
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'eslint-loader',
					include: [
						path.resolve(__dirname, 'src', 'scope'),
						path.resolve(__dirname, 'src', 'shared')
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
						path.resolve(__dirname, 'src', 'scope'),
						path.resolve(__dirname, 'src', 'shared')
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
							path.join(__dirname, 'src', 'scope', 'layouts'),
							path.join(__dirname, 'src', 'scope', 'common'),
							path.join(__dirname, 'src', 'scope', 'components'),
						],
						helperDirs: [
							path.join(__dirname, 'src', 'shared', 'scripts', 'helpers'),
							path.join(__dirname, 'src', 'scope', 'scripts', 'helpers'),
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
									'/src/scope/styles',
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
				dest: 'dist/Scope.Website/App_Config/Include/Project/Scope',
				filename: 'Scope.Website.Frontend.config',
				hashLength: 5,
				fn: hash =>
					`<?xml version="1.0" encoding="utf-8" ?><configuration><sitecore><settings><setting name="Scope.Project.Site.Frontend.Hash"  value="${hash}" /></settings></sitecore></configuration>`,
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
