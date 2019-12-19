//webpack 是node写出来的，node写法

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(path.resolve('dist'));
module.exports = {
    devServer: { //开发环境的地址
        port: 3000,
        progress: true //显示进度条
        // contentBase:'./dist'  //访问的默认目录是dist文件，若不设置的话，访问的就是整个目录文件
    },
    mode: 'development', //模式  默认两种 production和 development  （开发模式代码没有压缩）
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js', //(hash显示8位)导出后的文件名,此处加了一个hash值，确保每次打包出来的文件名不同，避免缓存
        path: path.resolve('dist') //path必须为一个绝对路径，所以通过  变量.resolve()可以变成一个绝对路径（此处在dist目录下）
    },
    plugins: [ //数组  放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', //模板存放的位置
            filename: 'index.html', //新构建好的文件名字叫做index.html
            minify: {
                removeAttributeQuotes: true, //去掉可以删除的双引号
                collapseWhitespace: true //压缩空格，只显示为一行
            },
            hash: true //关于js文件的引用，以hash命名的方式引用
        })
    ],
    module: { //模块
        rules: [ //规则  
            // css-loader可以使在css文件中写@import这种语法,解析路径
            // style-loader他是把css插入到head的标签中
            // loader的特点是处理单一事件，所以css-loader和style-loader是分开的
            // loader的顺序默认是从右到左执行
            // use部分 还可以写成对象数组，这样可以传参
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    }, 
                    'css-loader'
                    
                ]
            },
            {
                //可以处理less less-loader sass node-sass sass-loader stylus
                test: /\.less$/,
                use: [{
                        loader: 'style-loader'
                    }, 'css-loader',
                    'less-loader' //将less转为css
                ]
            }
        ]
    }
}