const rpcWSC = require('rpc-websockets').Client;

var server = new rpcWSC('ws://localhost:4000');

server.on('open',()=>{
   
});
var counter = 0;
process.stdin.setEncoding('utf8');
process.stdin.on('readable', ()=>{
    let chunk = null;
    while((chunk = process.stdin.read())!=null){
        console.log(chunk);
        server.notify(chunk.trim(),{message:`Hello: ${chunk}`,counter:counter++});
    }
});