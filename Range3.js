function Range(from,to){
    this.from = from;
    this.to = to;
}

Range.prototype = {
    include:function(x){return x>=this.from && x<= this.to},
    foreach:function(p){
        for(var x = Math.ceil(this.from);x<=this.to ;x++){
            p(x);
        }
    },
    toString:function(){
        return "("+this.from+"..."+this.to+")";
    }
};

var r = new Range(1,3);
console.log(r.include(2));
r.foreach(console.log);
console.log(r.toString());