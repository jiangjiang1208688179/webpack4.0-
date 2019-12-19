let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
   
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    devServer: {
        hot:true,  //启用热更新
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
    
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/, //不去查找的地方
            include: path.resolve('src'), //需要查找的地方
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        }]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
   
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), //忽略掉某些内容，从moment中如果有用locale,则忽略
        new HtmlWebpackPlugin({
            template: './public/index.html'
           
        })
    ]
}