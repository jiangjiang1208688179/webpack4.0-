import a from './a.js';
import {b} from './b.js';
if(module.hot){ 
    module.hot.accept('./a.js',(res)=>{
        console.log('343',res)
    });
    module.hot.accept('./b.js',(res)=>{
        console.log('bb',res)
    })
}
console.log('e3w');


// let but = document.createElement('button');
// but.innerHTML = '点我加载';
// but.addEventListener('click',function(){
//     import('./a.js').then(res => {
//         console.log(res.Module,res.a)
//     })

// })
// document.body.appendChild(but);