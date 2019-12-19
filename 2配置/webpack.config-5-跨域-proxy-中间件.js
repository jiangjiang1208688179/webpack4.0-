let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        home: './src/index.js'

    },
    module: {
        rules: [{
            test: '/\.js$/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        // 3）有服务端，不用代理处理，在服务端启用webpack，端口用服务端的（服务端需要使用到中间件）

        // 2)前端自己模拟数据

        // before(app) { //提供的方法 钩子
        //     app.get('/user', (req, res) => {
        //         res.json({
        //             name: 'zhang',
        //             age: 45
        //         })
        //     })
        // }
        //1)
        // proxy:{  //配置代理(重写的方式 把请求代理到express服务器上)
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite:{'/api':''}    //前端调用接口写/api字段，而后端并没有/api字段，所以在匹配后端接口时需要将'/api'替换为''
        //     }
        // }
    },
    output: {
        filename: '[name].js', //多出口设置
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'

        }),
        new CleanWebpackPlugin()
       

    ]
}