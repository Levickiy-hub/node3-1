const rpcWS = require('rpc-websockets').Server

let server = new rpcWS({port:4000,host:'localhost'});

server.register('A',(params)=>{
    console.log('A',params);
}).public();

server.register('B',(params)=>{
    console.log('B',params);
}).public();

server.register('C',(params)=>{
    console.log('C',params);
}).public();