const http = require("http");
const data = require("./db");
const fs = require("fs");
const url = require("url");

const db = new data.DB();
let ID = 0;

db.on('GET', (req, res)=>{
    res.end(JSON.stringify(db.select()));
});
db.on('POST', (req, res)=>{
    req.on('data', data=>{
        let r = JSON.parse(data);
        db.insert(r);
        res.end(JSON.stringify(r));
    });
});
db.on('PUT', (req, res)=>{
    req.on('data', data=>{
        let r = JSON.parse(data);
        res.end(JSON.stringify(db.update(r)));
    });
});
db.on('DELETE', (req, res) => {
    console.log("del")
    res.end(JSON.stringify(db.delete(ID)));
});

http.createServer(function(request, response){
    if(url.parse(request.url).pathname === '/'){
        let html = fs.readFileSync('index.html');
        response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        response.end(html);
    }else if(url.parse(request.url).pathname === '/api/db'){
        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
        if(typeof url.parse(request.url, true).query.id!='undefined')
            ID = parseInt(url.parse(request.url,true).query.id);
        db.emit(request.method, request, response);
    }
}).listen(5000, function(){
    console.log("Server started at 5000");
});