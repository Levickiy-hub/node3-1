var http = require('http');
var fs = require('fs');
var parser = require('xml2json');
var url = require('url');
var qs=  require('querystring');
var mp = require('multiparty');
let k=0;

var server = http.createServer(function(request, response){

    if((url.parse(request.url).pathname).includes('parameters')){
            if(request.method=='GET'){
                let path  = url.parse(request.url,true);
                let result ="";
                let array=[];
                decodeURI(path.pathname).split('/').forEach(element=>{
                    array.push(element);
                })
                let x = parseInt(array[2]);
                let y = parseInt(array[3]);
                if(Number.isInteger(x)&&Number.isInteger(y)){
                    response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                    response.end(JSON.stringify({sum: x+y,diff: x-y,multiplication:x*y,
                        division:x/y}));
                }else{
                    response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                        response.end(path.pathname);
                }
            }

    }

    if((url.parse(request.url).pathname).includes('static/')){
        fs.access(`${request.url}`,fs.constants.R_OK,err=>{
                try{
                    console.log(`${request.url}`);
                    response.writeHead(200,{});
                    var file=fs.readFileSync(`.${request.url}`);
                    response.end(file);
                }catch(error){
                    response.writeHead(404,{});
                    response.end(null);
                }
    });
    }
    switch((url.parse(request.url).pathname)){
        case '/connection':{
            if(request.method=='GET'){
                if( typeof url.parse(request.url,true).query.set !='undefined'){
                    let set = parseInt(url.parse(request.url,true).query.set);
                    if(Number.isInteger(set)){
                        server.keepAliveTimeout = set;
                        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                        response.end(JSON.stringify(server.keepAliveTimeout));
                    }
                }else{
                        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                        response.end(JSON.stringify(server.keepAliveTimeout));
                
                }
            }
            break;
        }
        case'/headers':{
            if(request.method=='GET'){
                response.setHeader("custom",123);
                response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                response.end(JSON.stringify({requset: request.headers,response: response.getHeaders()}));
            }
            break;

        }
        case'/parameter':{
            if(request.method=='GET'){
                if( typeof url.parse(request.url,true).query.x !='undefined'&& 
                    typeof url.parse(request.url,true).query.y !='undefined'){
                    let x = parseInt(url.parse(request.url,true).query.x);
                    let y = parseInt(url.parse(request.url,true).query.y);
                    if(Number.isInteger(x)&&Number.isInteger(y)){
                        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                        response.end(JSON.stringify({sum: x+y,diff: x-y,multiplication:x*y,
                            division:x/y}));
                    }else{
                        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                        response.end(JSON.stringify("ERROR"));
                    }
                }else{
                        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                        response.end(JSON.stringify("ERROR"));
                }
            }
            break;
        }
        case'/close':{
            if(request.method=='GET'){
                setTimeout(()=>{
                    process.exit();
                },10000)
                response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                response.end('shutdown server through 10 seconds');
            }
            break;
        }
        case'/socket':{
            if(request.method=='GET'){
                response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                let client=request.connection;
                let serv = request.connection;
                const forwarded = request.headers['x-forwarded-for']
                const ip = forwarded ? forwarded.split(/, /)[0] : request.connection.remoteAddress
                response.end('Client: '+client.remoteAddress+':'+client.remotePort  +'  Server:'+client.localAddress+':'+client.localPort);
            }
            break;
        }
        case'/req-data':{
            let s="";
            if(request.method=='GET'){
                console.log(`request url: ${request.url},`,k++);
                let buf;
                request.on('data',(data)=>{
                    console.log('request.on(data) =',data.length);
                    buf+=data;
                });
                request.on('end',()=>{
                    console.log('request.on(end) =',buf.length)
                })
                response.write('<h2>HTTP-Server</h2>');
                s+=`url=${request.url},request/response ${k}`;
                response.end(s);
            }
            break;

        }
        case'/resp-status':{
            if(request.method=='GET'){
                if(typeof url.parse(request.url,true).query.code!='undefined'&&
                    typeof url.parse(request.url,true).query.mess){
                    var code = url.parse(request.url,true).query.code;
                    var mess = url.parse(request.url,true).query.mess;

                    response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                    response.end(JSON.stringify({status:code,describe:mess}));
               }else{
                response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                response.end("ERROR");
               }
            }
            break;

        }
        case'/formparameter':{
            if(request.method=='GET'){
                let html =fs.readFileSync('./static/formparametr.html');
                response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                response.end(html);
            }else if (request.method=='POST'){
                var result="";
                request.on('data',(data)=>{ 
                    result+=data;
                })
                request.on('end',()=>{
                    result+='<br/>';
                    let o = qs.parse(result);
                    for (let elem in o){
                        
                        result+=`<div>${elem} + value: ${o[elem]}</div>`;
                    }
                    response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    response.end(result);
                })
               
            }
            break;

        }
         case'/json':{
            if(request.method=='POST'){
                var result="";
                var json;
                request.on('data',(data)=>{ 
                    result+=data;
                })
                request.on('end',()=>{
                    console.log(result);
                    json= JSON.parse(result);
                    console.log(json);
                    let sum = json.x+json.y;
                    let name = json.o.surname + " " + json.o.name;
                    response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    response.end(`{
                        "__comment": "Response",
                        "x_plus_y":${sum},
                        "Conccat":${name},
                        "Length_m":${json.m.length}
                    }`);
                })
            }
            break;

        }
        case'/xml':{
            if(request.method=='POST'){
                var result="";
                var xml;
                request.on('data',(data)=>{ 
                    result+=data;
                })
                request.on('end',()=>{
                    console.log(result);
                    xml = JSON.parse(parser.toJson(result, {reversible: true}));
                    console.log(xml.request.x[0].value);
                    
                    let sum = Number.parseInt(xml.request.x[0].value) + Number.parseInt(xml.request.x[1].value);
                    let concat = xml.request.m[0].value + xml.request.m[1].value + xml.request.m[2].value;
                    response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    response.end(`
                    <response id="33" requser =${xml.request.id}>   
                        <sum element = "x" result=${sum}></sum>
                        <concat elemnt ="m" result=${concat}></concat>
                    <response/>
                    `);
                })
            }
            break;
        }
        case'/files':{
            if(request.method=='GET'){
                var count;
                fs.readdir( './static/', (error, files) => { 
                     count = files.length; // return the number of files
                    console.log(count); // print the total number of files
                    response.setHeader('X-static-files-count',count);
                    response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                    response.end("Count: " + count);
                 });
                
            }
            break;

        }
        case'/upload':{
            if(request.method=='GET'){
                let html = fs.readFileSync('./static/upload.html');
                response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                response.end(html);
            }
             if(request.method=='POST'){
                console.log("res")
                let result="";
                let form = new mp.Form({uploadDir:'./static'});
                request.on('data',(data)=>{
                    result+=data;
                });
                form.parse(request,(error,fields,files)=>{
                    console.log(result);
                    console.log(files);
                    response.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                    response.end("Successful");
                    return;
                })
                // form.on('field',(name,value)=>{
                //     console.log("________________field________________");
                //     console.log(name,value);
                //     result+=`<br/>--${name}=${value}`;
                //     console.log(result);
                // })
                form.parse(request);
                response.end("E");
            }
            break;

        }
    }
}).listen(3000);
console.log('Server is started');