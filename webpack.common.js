const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"],
		extensions: [".js", ".jsx", ".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, "src"),
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env", { modules: false }],
							[
								"@babel/preset-react",
								{
									runtime: "automatic",
								},
							],
						],
						plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"],
					},
				},
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
				],
			},
			{
				test: /\.(png|jp(e*)g|gif)$/,
				type: "asset/resource",
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
		],
	},
	optimization: {
		runtimeChunk: "single",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "index.html"),
			inject: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, "src", "assets"),
					to: "assets",
				},
			],
		}),
	],
};
