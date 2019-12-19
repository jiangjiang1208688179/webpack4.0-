let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:{  //多入口
        home: './src/index.js',
        other: './src/other.js'
    },
    output:{
        filename:'[name].js',  //多出口设置
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'home.html',
            chunks:['home']   //选择默认入口文件，默认情况是所有入口文件
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'other.html',
            chunks: ['other']
        })
    ]
}