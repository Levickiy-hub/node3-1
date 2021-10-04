const rpcWS = require('rpc-websockets').Server

let server = new rpcWS({ port: 4000, host: 'localhost' });

server.event('A');
server.event('B');
server.event('C');
let k = 0;


process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    let chunk = null;
    while ((chunk = process.stdin.read()) != null) {
        switch (chunk.trim()) {
            case "A": {
                setInterval(() => {
                    server.emit('A', { message: 'Event A', count: ++k });
                }, 1000);

                break;
            }
            case "B": {
                setInterval(() => {
                    server.emit('B', { message: 'Event B', count: ++k });
                }, 4000);

                break;
            }
            case "C": {

                setInterval(() => {
                    server.emit('C', { message: 'Event C', count: ++k });
                }, 2000);

                break;
            }
        }
    }
});