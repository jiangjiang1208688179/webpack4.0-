let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'production',
    entry:{
        home: './src/index.js'
       
    },
    module:{
        rules:[
            {
                test: '/\.js$/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    watch:true,  //
    watchOptions: {  //监控的选项
        poll: 1000,  // 每秒问我1000次
        aggregateTimeout: 500,  //500毫秒内，输入的东西只打包一次，防抖的作用
        ignored: '/node_modules/'  //不需要监控的文件
    },
    output:{
        filename:'[name].js',  //多出口设置
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
           
        })
    
    ]
}