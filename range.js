//定义工厂方法，返回一个新的“范围对象”
function range(from,to){
    //使用inherit()函数来创建对象，这个对象继承自在下面定义的原型对象
    //原型对象作为函数的一个属性存储，并定义所有的“范围对象”所共享的方法
    var r = inherit(range.methods);
    
    //存储新的“范围对象”的起始位置和结束位置
    //这两个属性是不可继承的，每个对象斗拥有唯一对象
    r.from = from;
    r.to = to;
    
    //返回这个新创建的对象
    return r;
}
//原型对象定义方法，这些方法为每个范围对象所继承
range.methods = {
    //如果x在范围内，则返回ture，否则返回false；
    //这个方法可以比较数字范围，也可以比较字符串和日期范围；
    include:function (x){
        return this.from <= x && x<=this.to;
    },
    
    //对于范围内的每个整数都调用一次f
    //这个方法只可以用作数字范围
    foreach:function (f){
        for(var x = Math.ceil(this.from);x<=this.to;x++){
            f(x);
        }
    },
    
    toString:function(){
        return "("+this.from+"..."+this.to+")";
    }
};

console.log("** begin **");
var r = range(1,3);
r.include(2);
r.foreach(console.log);
console.log(r);
console.log("** end **");