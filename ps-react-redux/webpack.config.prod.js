const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // minifies CSS and extracts to a separate file
const webpackBundleAnalyzer = require('webpack-bundle-analyzer'); // creates a report of whats in our bundle

/******
 * Differences from development config
 *      - modules MiniCssExtractPlugin and webpackBundleAnalyzer
 *      - set process.env.NODE_ENV and module.exports.mode to production
 *      - use source-map instead of cheap-module-source-map, which is slower but higher quality
 *      - remove devServer section
 *      - add another DefinePlugin to share the production environment variable to the libraries webpack is building (React)
 *      - add MiniCssExtractPlugin and webpackBundleAnalyzer plugins
 *      - add minify settings to the HtmlWebpackPlugin
 *      - change the CSS loaders to generate minified and source mapped CSS
 *   ******/

// Node environment variable, for Babel plugin
process.env.NODE_ENV = 'production';

module.exports = {
    mode: 'production',     // So webpack knows to run in production mode, with some useful defaults for production builds
    target: 'web',          // Alternative e.g. node
    devtool: 'source-map',  // to get a source map for debugging in the browser, even though we transpile. source-map is recommended for production (slower, but higher quality)
    entry: './src/index',   // App entry point
    // Note: Webpack WILL output files now as we're in production
    output: {
        path: path.resolve(__dirname, "build"), // Where it will serve the file in memory from
        publicPath: '/',        // Path on localhost where it will be served
        filename: 'bundle.js'   // Name of the output file
    },
    plugins: [
        // This plugin displays bundle stats
        new webpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        // This plugin generates a minified CSS file
        new MiniCssExtractPlugin({
            // Webpack picks the name for us, and add a hash so the filename only changes when CSS changes.
            // This supportsg far-expires headers on your webserver so the file only has to reloaded by users when it changes.
            filename: '[name].[contenthash].css'
        }),
        // This plugin is for setting environment variables
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV), // This global makes sure React is built in prod mode
            "process.env.API_URL": JSON.stringify("http://localhost:3001")
        }),
        // This plugin performs a number of functions, like generating the index.html and adds a reference to the JS and CSS bundles into the HTML for us.
        // This is handy because the JS and CSS file names will change over time.
        new HtmlWebpackPlugin({
            template: "src/index.html", // Where our HTML template is
            favicon: "src/favicon.ico", // Where our favicon is,
            // Minify settings for the HTML
            minify: {
                // see https://github.com/kangax/html-minifier#options-quick-reference
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
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
                // CSS - minifies and bundles our CSS
                test: /(\.css)$/,
                // To summarize how below works:
                //  1. postcss-loader uses cssnano to minify our CSS
                //  2. css-loader generates a source map and uses MiniCssExtractPlugin to push it to a separate file
                use: [
                    // MiniCssExtractPlugin will extract our CSS to a separate file using the css-loader, and generate a source map.
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // postcss can perform a variety of processing on CSS.
                    // We're using the cssnano plugin to minify our CSS
                    // NOTE: this runs first, as these go bottom up
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('cssnano')],
                            sourceMap: true
                        }
                    }   // bottom-up
                ]
            }
        ]
    }
}