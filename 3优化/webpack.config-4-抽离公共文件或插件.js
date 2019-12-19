let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    optimization:{ 
        splitChunks:{ //分割代码块
            cacheGroups:{ //缓存组   //抽离规则是从上到下
                common:{ //公用的模块
                    chunks:'initial',
                    minSize:0, //只要有内容
                    minChunks:2 //只要使用过2次以上
                },
                vendor:{  //抽离第三方插件
                    priority:1, //添加权重，优先抽离
                    test: /node_module/,
                    chunks: 'initial',
                    minSize:0,
                    minChunks:2
                }
            }
           

        }
    },
    mode: 'development',
    entry: {
        index: './src/index.js',
        other: './src/other.js'
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
        noParse: /jquery/, //不解析jquery中的依赖库
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
        
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), //忽略掉某些内容，从moment中如果有用locale,则忽略
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}