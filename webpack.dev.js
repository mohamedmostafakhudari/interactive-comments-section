const path = require("path");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		client: {
			reconnect: true,
		},
		static: {
			directory: path.join(__dirname, "dist"),
			publicPath: "/",
		},
		compress: true,
		port: 9000,
		historyApiFallback: true,
	},
});
