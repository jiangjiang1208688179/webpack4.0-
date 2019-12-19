//express
let express = require('express');
let app = express();
let webpack = require('webpack');

//中间件
let middle = require('webpack-dev-middleware');
let config = require('./webpack.config.js');  //拿到配置文件
let compiler = webpack(config);  //用webpack来处理配置文件，拿到一个编译后的结果
app.use(middle(compiler)); //用中间件处理并启用

app.get('/user',(req,res)=>{
    res.json({name:"zhang",age:26})
})
app.listen(3000);