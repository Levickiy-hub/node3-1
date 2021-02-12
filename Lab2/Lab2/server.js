'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var fs = require("fs");
var index = fs.readFileSync('./index.html');
var picture = fs.readFileSync('./image/alg.png');
var xmlhttprequest = fs.readFileSync('./xmlhttprequest.html');
var ftch = fs.readFileSync('./fetch.html');
var jquery = fs.readFileSync('./jquery.html')
fs.close;
http.createServer(function (req, res) {
    if (req.url == '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        
        res.end(index);
    }
    if (req.url == '/png') {
        res.writeHead(200, { 'Content-Type': 'image/png' });

        res.end(picture);
    }
    if (req.url == '/api/name') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
   
        res.end('Levitsky Vyacheslav Sergeevich');
    }
    if (req.url == '/xmlhttprequest') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(xmlhttprequest);
    }
    if (req.url == '/fetch') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(ftch);
    }
    if (req.url == '/jquery') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(jquery);
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello World<h1>');
    }
}).listen(port);
