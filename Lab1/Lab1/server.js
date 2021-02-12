'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    if (req.method == "GET") {
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Hello World\n</h1>');
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>' + req.url + '</h1>');
            res.write('<h1>' + req.method + '</h1>');
            res.write('<h1>' + req.headers['user-agent'] + '</h1>');
            res.end('<h1>Hello World\n</h1>');
        }
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>' + req.method + '</h1>');
        res.end('<h1>Hello World\n</h1>');
    }
    
}).listen(port);
