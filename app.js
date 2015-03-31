//app.js:这是一个简单的Node HTTP服务器,能处理当前目录的文件
//并能实现两种特殊的URL用于测试
//用http://localhost:8000 或者 http://127.0.0.1:3000 连接这个服务器

//首先,加载所有要用到的模块
var http = require("http");         //HTTP服务器API
var fs = require('fs');             //用于处理本地文件

var server = new http.Server();   //创建新的HTTP服务器
server.listen(3000);               //在端口3000上运行它

//Node使用"on()"方法注册事件处理程序
//当服务器得到新的请求,则运行函数处理它
server.on("request",function(request,response){
    //解析请求的URL
    var url = require('url').parse(request.url);
    //特殊URL会让服务器在发送响应前先等待
    //此处用于模拟缓慢的网络连接
    if(url.pathname === "/test/delay"){
        //使用查询字符串来获取延迟时长,或者2000毫秒
        var delay = parseInt(url.query) || 2000;
        console.log(url.query);
        //设置响应状态码和头
        response.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
        // 立即开始编写响应主体
        response.write("Sleeping for "+delay+ " milliseconds...");
        //在之后调用的另一个函数中完成响应
        setTimeout(function(){
            response.write("done.");
            response.end();
        },delay);
    }
    
    //若请求是"/test/mirror",则原文返回它
    //当需要看到这个请求头和主体时,会很有用
    else if(url.pathname === "/test/mirror"){
        //响应状态和头
        response.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
        response.write(request.method+" "+request.url+ " HTTP/"+request.httpVersion + "\r\n");
        for(var h in request.headers){
            response.write(h+": "+request.headers[h]+"\r\n");
        }
        response.write("\r\n");
        
        //在这些事件处理程序函数中完成响应:
        //当请求主体的数据块完成时,把其写入响应中
        request.on("data",function(chunk){ response.write(chunk);});
        //当请求结束时,响应也完成
        request.on("end",function(chunk){response.end();})
    }
    
    //否则,处理来自本地目录的文件
    else{
        //获取本地文件名,基于其扩展名推测内容类型
        var filename = url.pathname.substring(1);
        var type ;
        switch(filename.substring(filename.lastIndexOf(".")+1)){
            case "html":
            case "htm":         type = "text/html;charset=UTF-8";               break;
            case "js":          type = "application/javascript;charset=UTF-8";  break;
            case "css":         type = "text/css;charset = UTF-8";              break;
            case "pdf":         type = "application/pdf;charset = UTF-8";       break;
            default:            type = "application/octet-stream";              break;
        }
        
        fs.readFile(filename,function(err,content){
            if(err){
                response.writeHead(404,{"Content-Type":type});
                response.write(err.message);
                response.end();
            }else{//否则,若读取文件成功
                response.writeHead(200,{"Content-Type":type});
                response.write(content);    //把文件内容作为响应主体发送
                response.end();             //完成
            }
        });
    }                 
}
);
console.log("HTTP server is listening at port 3000.");