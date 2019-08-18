const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Node environment variable, for Babel plugin
process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',    // So webpack knows to run in development mode, setting Node environment to development
    target: 'web',          // Alternative e.g. node
    devtool: 'cheap-module-source-map',  // to get a source map for debugging in the browser, even though we transpile
    entry: './src/index',   // App entry point
    // Note: Webpack doesn't output anything in development (it does it from memory)
    output: {
        path: path.resolve(__dirname, "build"), // Where it will serve the file in memory from
        publicPath: '/',        // Path on localhost where it will be served
        filename: 'bundle.js'   // Name of the output file
    },
    // Webpack includes a web server, so we will use it to serve the app in development (simple)
    devServer: {
        stats: 'minimal',   // Reduces logging noise
        overlay: true,      // Overlay errors that occur in the browser
        historyApiFallback: true,   // All requests will be sent to index.html, so they can be handled by react-router
        // Lines below are necessary due to an issue in webpack using the latest version of Chrome
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html", // Where our HTML template is
            favicon: "src/favicon.ico"  // Where our favicon is
        }),
        // This plugin is for setting environment variables
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001")
        })
    ],
    module: {
        // What files we want webpack to handle
        rules: [
            {
                // Javascript - take all js or jsx files that aren't in node_modules, and run Babel and ESLint on them
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]  // bottom-up, so runs ESLint first, then Babel
            },
            {
                // CSS - use of style-loader and css-loader allows us to import CSS, and allows webpack to bundle it all into a single file
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}