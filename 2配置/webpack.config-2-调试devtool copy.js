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
    //源码映射会单独生成一个sourcemap文件  出错了会标识当前报错的的列和行
    // devtool:'source-map',  //添加一个映射文件，可以帮助我们调试源代码
    // devtool:'eval-source-map', // 不会单独生成一个sourcemap文件，但是会显示行和列
    // devtool:'cheap-module-source-map',   //不会产生列 但是是一个单独的映射文件,文件比较小（貌似不会提示报错行）
    // devtool:'cheap-module-eval-source-map',  //不会产生文件，集成在打包后的文件中  不会产生列
    devtool:'eval-source-map',  
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