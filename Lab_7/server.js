var http = require('http');
var fs = require('fs');
var { ServerFunc } = require('./module');

var serv = http.createServer(function (request, response) {
    ServerFunc('./static/',request,response);

}).listen(3000);

console.log('Server running at http://localhost:3000/');