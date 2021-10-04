var http = require('http');
var fs = require('fs');
function serverFunc (path,request,response){
    if (request.method==='GET') {
        switch (request.url) {
            case '/': {
                let html = fs.readFileSync(path+'index.html');
                response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                response.end(html);
                break;
            }
            case'/static/index.html':{
                let html = fs.readFileSync(path+'index.html');
                response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/css.css':{
                let html = fs.readFileSync(path+'css.css');
                response.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/js.js':{
                let html = fs.readFileSync(path+'js.js');
                response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/png.png':{
                let html = fs.readFileSync(path+'png.png');
                response.writeHead(200, { 'Content-Type': 'image/png; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/docx.docx':{
                let html = fs.readFileSync(path+'docx.docx');
                response.writeHead(200, { 'Content-Type': 'application/msword; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/json.json':{
                let html = fs.readFileSync(path+'json.json');
                response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/xml.xml':{
                let html = fs.readFileSync(path+'xml.xml');
                response.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
                response.end(html);
                break;
            }
            case '/static/video.mp4':{
                let html = fs.readFileSync(path+'video.mp4');
                response.writeHead(200, { 'Content-Type': 'video/mp4; charset=utf-8' });
                response.end(html);
                break;
            }

            default:{
                response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                response.end(null);
                break;
            }
        }
    }else{
        response.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(null);
    }
}

module.exports.ServerFunc = serverFunc;