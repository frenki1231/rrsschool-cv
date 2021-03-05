const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';

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

const plugins = () => {
    const plugin = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ];
    if (isDev){
        plugin.push(
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/assets'),
                        to: path.resolve(__dirname, 'build/assets'),
                    }
                ]
            })
        )
    }
    return plugin;
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
    plugins: plugins(),
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
                test: /\.png$|.svg$|.esp$/,
                use: ['file-loader'],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader'],
            },
        ]
    }
}