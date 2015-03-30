//range2.js:表示值的范围的类的另一种实现

//这是一个构造函数，用于初始化信创建的“范围对象”
//注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from,to){
    //存储“范围对象”的起始位置和结束位置（状态）
    //这两个属性是不可继承的,每个对象都拥有唯一的属性
    this.from = from;
    this.to = to;
}

//所有的"范围对象"都继承自这个对象
//注意,属性的名字必须是prototype
Range.prototype = {
    //如果x在范围内,则返回一个true,否则返回一个false
    //这个方法可以比较数字范围,也可以比较字符串范围和日期范围
    include:function(x){
        return this.from<= x && x <= this.to;
    },
    
    //对于每个整数都调用一次f
    //这个方法只用于数字范围
    foreach:function(f){
        for(var x = Math.ceil(this.from);x<= Math.ceil(this.to);x++){
            f(x);
        }
    },
    
    //返回这个范围的字符串
    toString:function(){
        return "("+this.from+"..."+this.to+")";
    }
};

var r1 = new Range(1,3);
console.log(r1.include(2));
console.log(r1.toString());
r1.foreach(console.log);