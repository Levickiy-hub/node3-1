'use strict';
var http = require('http');
var url = require("url");
var fs = require("fs");
var readline = require('readline');
var port = process.env.PORT || 1337;
var state = 'start'; var previousState = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let factorial = (n) => { return (n < 2 ? n : n * factorial(n - 1)); }

function Fact(n, cb) {
    this.fn = n;
    this.ffact = factorial;
    this.fcb = cb;
    this.calc = () => { process.nextTick(() => { this.fcb(null, this.ffact(this.fn)); }); }
};
function Fac2(n, cb) {
    this.fn = n;
    this.ffib = factorial;
    this.fcd = cb;
    this.calc = () => { setImmediate(() => { this.fcd(null, this.ffib(this.fn)); }); }
}


http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (url.parse(req.url, true).pathname == '/fact') {
        if (typeof url.parse(req.url, true).query.k != 'undefined') {
            let k = parseInt(url.parse(req.url, true).query.k);
            if (Number.isInteger(k)) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ k: k, fact: factorial(k) }));
            }
        }
    }
    if (url.parse(req.url, true).pathname == '/fact1') {
        if (typeof url.parse(req.url, true).query.k != 'undefined') {
            let k = parseInt(url.parse(req.url, true).query.k);
            if (Number.isInteger(k)) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                let fact = new Fact(k, (err, result) => { res.end(JSON.stringify({ k: k, factorial: result })); });
                fact.calc();
            }
        }
    }
    if (url.parse(req.url, true).pathname == '/fact2') {
        if (typeof url.parse(req.url, true).query.k != 'undefined') {
            let k = parseInt(url.parse(req.url, true).query.k);
            if (Number.isInteger(k)) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                let fac2 = new Fac2(k, (err, result) => { res.end(JSON.stringify({ k: k, factorial: result })); });
                fac2.calc();
            }
        }
    }
    if (url.parse(req.url, true).pathname == '/fetch') {
        var ftch = fs.readFileSync('./fetch.html');
        res.end(ftch);
    }
    else if (url.parse(req.url, true).pathname == '/') {
        rl.question('status: ', (answer) => {
            if (answer == 'exit') { process.exit(); }
            if (answer == 'norm' || answer == 'stop' || answer == 'test' || answer == 'idle') {
                previousState = state;
                state = answer;
                process.stdout.write(`${previousState}->${state}\n`);
            }
        });
        res.end(state + '\n');
    }
       
    
}).listen(port);

  
