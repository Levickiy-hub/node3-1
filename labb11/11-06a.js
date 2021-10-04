const rpcWSC = require('rpc-websockets').Client;

let server = new rpcWSC('ws://localhost:4000');

server.on('open',()=>{
    server.subscribe('A');

    server.on('A',(res)=>{
        console.log(res);
    });
});