# webpack4.0-
关于webpack4.0的构建、优化笔记
## webpack基础篇

- 安装webpack(安装本地)
yarn add webpack webpack-cli -D
- 打包命令
npx webpack   //会执行node-model下的.bin文件下的webpack.cmd,完成后会生成一个dis文件，具体内容就打包到dis文件下的main.js

### webpack可以进行0配置
- 打包工具 -> 输出后的结果（js模块）
- 打包（支持我们的js模块化  （export导出，require引入）

### 手动配置webpack
- 默认配置文件的名字 webpack.config.js (需要自己新建一个文件)
- 重新配置（1、npx webpack --config webpack.config.my.js  2、在package.json中配置"scripts":{
    "build": "webpack --config webpack.config.my.js"
  },    最后在命令行中  npm run build）
- 设置本地访问服务(我们常见的localhost:8080)  yarn add webpack-dev-server -D ;然后运行npx webpack-dev-server  (默认是显示争个文件的目录)
  如何配置自定义访问的目录？（1、配置npm run dev :在package.json中
  "scripts": {
    "dev": "webpack-dev-server"
  }
  然后在webpack.config.js文件中
  devServer:{  //开发环境的地址
        port: 3000,
        progress:true,  //显示进度条
        contentBase:'./dist'  //访问的默认目录设置为dist文件，若不设置的话，访问的就是整个目录文件
    }
  最后运行  npm run dev
  ）

- 将npx webpack打包好的文件自动放入html中，需要下载插件 html-webpack-plugin，然后配置plungin
 plugins:[  //数组  放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',  //模板存放的位置
            filename: 'index.html',  //新构建好的文件名字叫做index.html
            minify: {
                removeAttributeQuotes: true,  //去掉可以删除的双引号
                collapseWhitespace:true  //压缩空格，只显示为一行
            },
            hash:true
        })
    ]

- 如何打包css
* 只有css则需要下载 css-loader 和 style-loader，webpack.config.json中配置
module:{  //模块
        rules: [  //规则  
            // css-loader可以使在css文件中写@import这种语法,解析路径
            // style-loader他是把css插入到head的标签中
            // loader的特点是处理单一事件，所以css-loader和style-loader是分开的
            // loader的顺序默认是从右到左执行
            // use部分 还可以写成对象数组，这样可以传参
            {test: /\.css$/, use:[{
                loader: 'style-loader'
            },'css-loader']}
        ]
    }
* 若有less文件,需要下载less 和 less-loader : yarn less less-loader -D
  配置 
  {test: /\.less$/, use:[{
                loader: 'style-loader'
            },
            'css-loader',
            'less-loader'
  ]}

- 抽离css插件 mini-css-extract-plugin
- css自动添加一些css的前缀 postcss-loader 和 autoprefixer  （使用该项需要额外配置一个postcss.config.js）
- css 压缩（安装插件optimize-css-assets-webpack-plugin 结合 uglifyjs-webpack-plugin）


- 将es6语法转换成原生es5  yarn add babel-loader @babel/core @babel/preset-env  -D
  在module中配置rules添加
    {
              test: /\.js$/,
              use: [{
                  loader: 'babel-loader',
                  options:{  //将es6转为es5
                    presets:[
                        '@babel/preset-env'
                    ]
                  }
              }]  
            }


- 校验es规范eslint: yarn add eslint eslint-loader

-关于图片打包的loader
* js创建的img：file-loader
* css引用的： css-loader
* html文件直接引入的： html-withimg-loader
* 小图片变成base64：url-loader

## webpack第二部分-配置篇
- devtool 调试代码功能,添加此项可以在打包好后的文件发现出错的代码具体出现在哪行和哪些文件（常见4种方式）
* devtool:'source-map',  //添加一个映射文件，可以帮助我们调试源代码
* devtool:'eval-source-map', // 不会单独生成一个sourcemap文件，但是会显示行和列
* devtool:'cheap-module-source-map',   //不会产生列 但是是一个单独的映射文件,文件比较小（貌似不会提示报错行）
* devtool:'cheap-module-eval-source-map',  //不会产生文件，集成在打包后的文件中  不会产生列
- watch  关注代码的更改，实现实时编译（实时打包）
```
 watch:true,  //
    watchOptions: {  //监控的选项
        poll: 1000,  // 每秒问我1000次
        aggregateTimeout: 500,  //500毫秒内，输入的东西只打包一次，防抖的作用
        ignored: '/node_modules/'  //不需要监控的文件
    }
```
- clean-webpack-plugin 在run build时，将原来dist目录下的文件删除（注意，使用方法优点不一样，https://github.com/johnagan/clean-webpack-plugin）
* let {CleanWebpackPlugin} = require('clean-webpack-plugin');
* 在plugins中直接 new CleanWebpackPlugin(),
- copyWebpackPlugin  安装yarn add copy-webpack-plugin -D 打包时，将某个文件的内容拷贝到某个地方，默认为打包输出的文件夹dist
- bannerPlugin       内置的，直接使用webpack.BannerPlugin('....')版权归谁所有,会将结果加到输出的js文件的开头（注释内容）
- 跨域（webpack默认有node的一个express框架,编写一个server.js来启动服务端）
* 1、使用proxy来代理
* 2、在node中使用中间件webpack-dev-middleware,来启动服务
- 环境变量
```
plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),  //此处不能是一个变量或者字符串，否则会提示没有定义
            FLAG: 'true',
            EXPORESSION:'1+1'
        })
```
- 环境变量之单独文件分配： webpack-merge  (可以使生产环境和开发环境放在不同的文件，然后根据不同命令来打包生产文件还是开发文件)

## 优化
- module中配置noParse,对于不需要额外解析的东西不解析，比如jquery， noParse:/jquery/,
- 在rules中匹配文件时，排除和包含  exclude:/node_modules/,include:path.resolve('src')
- 在有些插件中优化大小。 比如moment中的locale，需要使用 new webpack.IgnorePlugin(/\.\/locale/,/moment/),需要注意的是，若页面需要用到locale则需要手动引入需要的包
- 动态链接库dllPlugin，以react为例,需要先安装react 和react-dom (利用webpack自带的插件，将一些常用的插件单独打包，然后引用)
- 多线程打包happypack， 安装 yarn add happypack -D  （适用于项目比较大的情况，因为分配线程也会花时间）
- webpack 3.0以上（生产环境下）自带的两个优化
* tree-shaking 把没有用的代码自动删除掉（import在生产环境下，会自动去掉没有用的代码，而require不会）
* scope hosting作用域提升。webpack中会自动省略一些简化的代码
- 多页面打包抽取公共代码 splitChunks (可以抽离公共插件（插件用正则在node_module中找）或者自己写的公共文件)
- 懒加载，通过import()动态的加载文件，该方法返回的的是一个promise，因为ES6中已经支持import()，所以不需要额外配置
- 热跟新：只更新页面的某个部分，并不需要刷新整个页面 webpack.NameModulesPlugin() （打印更新的模块路径）和 webpack.HotModuleReplacementPlugin()（热更新插件）,配置两个之后，使用的时候需要用module.hot来判断
* 方式：配置文件中devServer:{hot:true},Plugins中配置两个插件
* 使用时：(只有事先引入过的文件，才能够热更新，若未提前引入，该路径的热更新无效)
```
import a from './a.js'
import b from './b.js'
if(module.hot){ 
    module.hot.accept('./a.js',(res)=>{
        console.log('343',res)
    });
    module.hot.accept('./b.js',(res)=>{
        console.log('bb',res)
    })
}
```

## tapable
