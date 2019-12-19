let xhr = new XMLHttpRequest();
xhr.open('GET','/user',true);
xhr.onload = function(){
    console.log(xhr.response)
};
xhr.send();
console.log('dsf');
console.log(DEV + EXPORESSION);
console.log(EXPORESSION)
// import {key,aa} from './other.js'
// console.log('hogydsftdesfyty',key);
// aa()
// class People{
//     constructor(name){
//         this.name = name;
//         console.lo('姓名是：' + name)
//     }
// }
// let zhang = new People('zhang');