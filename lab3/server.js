'use strict';
var http = require('http');
var url1 = require("url");
var readline = require('readline');
var port = process.env.PORT || 1337;
var state = 'start'; var previousState = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let factorial = (n) => { return (n < 2 ? n : n * factorial(n - 1)); }

http.createServer(function (req, res) {
   let url = url.parse(req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (url.pathname =='/fact') {
        //if (typeof url.parse(req.url, true).query.k != 'undefined') {
        //    let k = parseInt(url.parse(req.url, true).query.k);
        //    if (Number.isInteger(k)) {
        //        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        //        res.end(JSON.stringify({ k: k, fact: factorial(k) }));
        //    }
        //}
    }
    else {
        rl.question('status: ', (answer) => {
            if (answer == 'exit') { process.exit(); }
            if (answer == 'norm' || answer == 'stop' || answer == 'test' || answer == 'idle') {
                previousState = state;
                state = answer;
                process.stdout.write(`${previousState}->${state}\n`);
            }
        });
    }
        res.end(state + '\n');
    
}).listen(port);

  
