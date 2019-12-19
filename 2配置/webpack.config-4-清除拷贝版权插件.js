let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let Webpack = require('webpack')

// 1) cleanWebpackPlugin  //使用场景，在每次打包时候，将原来dist目录下的文件先删除
// 2) copyWebpackPlugin  //打包时，将某个文件的内容拷贝到某个地方，默认为打包输出的文件夹dist
// 3) bannerPlugin       //内置的，版权归谁所有,会将结果加到输出的js文件的开头（注释内容）
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
    
    output:{
        filename:'[name].js',  //多出口设置
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
           
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{from:'./public',to:'./'},{from:'./doc',to:'./'}]),
        new Webpack.BannerPlugin('make 2019 by jiang')
    
    ]
}