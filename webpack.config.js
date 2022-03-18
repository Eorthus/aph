const { resolve } = require('path');

//const SRC = path.resolve(__dirname, 'node_modules');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {                  // 1
    entry: './js/index.js',
    mode: "development",  // 2
    output: {
        path: resolve(__dirname, 'build'), // 2
        filename: 'main.js',
        assetModuleFilename: 'img/[name].[ext]',

    },
    resolve: {
        alias: {
            images: resolve(__dirname, 'build/img/'),

        },
    },
    module: {
        rules: [
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/inline',

            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }


            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssPlugin.loader, 'css-loader', 'sass-loader']
            }

        ]
    },
    plugins: [
        new MiniCssPlugin({
            filename: '[name].css'
        }),
        new HtmlPlugin({
            template: resolve(__dirname, 'index.html')
        }),
    ],
    devServer: {
        port: 5000
    }

};