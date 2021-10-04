const rpcWSC = require('rpc-websockets').Client;

let server = new rpcWSC('ws://localhost:4000');

server.on('open',()=>{
    server.subscribe('B');

    server.on('B',(res)=>{
        console.log(res);
    });
});