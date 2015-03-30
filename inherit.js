//inherit()返回了一个继承自原型对象p的属性的新对象
//这里使用ECMAScript 5中国的Object.create()函数（如果存在的话）
//如果不存在Object.create(),则退化使用其他方法
function inherit(p) {
    if(p == null){ //p是一个对象，单不能是null
        throw TypeError();
    }
    if(Object.create){
        return Object.create(p);
    }
    var t =  typeof p;
    if(t!=="object" && t!=="function") throw TypeError();
    function f(){};
    f.prototype = p;
    return new f();
}