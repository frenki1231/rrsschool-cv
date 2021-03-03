const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const cssLoader = (extra)=>{
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '',
            }
        },
        'css-loader',
    ];
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['./style.scss'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        port: 3333,
        compress: true,
        hot: isDev,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'build/assets'),
                }
            ]
        })
    ],
    module:{
        rules: [
            {
                test: /\.css$/,
                use: cssLoader(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader'),
            },
            {
                test: /\.png$|.svg$/,
                use: ['file-loader'],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader'],
            },
        ]
    }
}