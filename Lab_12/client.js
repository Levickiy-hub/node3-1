const rpcWSC = require('rpc-websockets').Client;

let server = new rpcWSC('ws://localhost:4000');

server.on('open',()=>{
    server.subscribe('fileChange');

    server.on('fileChange',(res)=>{
        console.log(res);
    });
});