const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "src"),
		},
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".*", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							[
								"@babel/preset-react",
								{
									runtime: "automatic",
								},
							],
						],
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
				test: /\.(png|jp(e*)g|svg|gif)$/,
				type: "asset/resource",
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "index.html"),
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
