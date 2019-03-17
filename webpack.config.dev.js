const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/entry.tsx',
    },
    mode: 'development',
    node: {
        fs: "empty"
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: false,
        host: 'localhost',
        port: 8080,
        hot: true,
        inline: true,
        https: (() => {

            try {
                return {
                    key: fs.readFileSync(path.join(__dirname, './localhost.key')),
                    cert: fs.readFileSync(path.join(__dirname, './localhost.cert'))
                };
            } catch (e) {
                if (typeof console !== 'undefined' && typeof console.error === 'function') console.error('ERR: [WebpackConfig] - https() - Failed to read key/cert file. Falling back to http\n');
                return false;
            }

        })(),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, /\.(spec|test).tsx?$/],
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.dev.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[id].bundle.[hash].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin([
            'public'
        ]),
        new HtmlWebpackPlugin({
            title: 'test - title',
            filename: 'index.html',
            template: '!!handlebars-loader!src/entry.hbs',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
