let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    devServer:{
        port:3000,
        open:true,
        contentBase:'./dist'    
    },
    module:{
        noParse:/jquery/, //不解析jquery中的依赖库
        rules:[
            {test:/\.js$/,
            exclude:/node_modules/, //不去查找的地方
            include:path.resolve('src'), //需要查找的地方
            loader:'babel-loader',
            options:{
                presets:[
                    '@babel/preset-env',
                    '@babel/preset-react'
                ]
            }}
        ]
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new webpack.IgnorePlugin(/\.\/locale/,/moment/), //忽略掉某些内容，从moment中如果有用locale,则忽略
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}