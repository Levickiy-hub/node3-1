const WebSocket = require('ws');

const wsPort = 4000;

const wsServer = new WebSocket.Server({ port: wsPort, host: 'localhost' });

wsServer.on('connection', (ws) => {
  let n = 0;

  ws.on('pong', (data) => {
    console.log(`on pong: ${data.toString()}
    Open connections: ${wsServer.clients.size}`);
  });

  setInterval(() => {
    ws.ping('server pong');
  }, 5000);

  setInterval(() => {
    ws.send(`11-3-server: ${n++}\n`);
  }, 10000);
});
wsServer.on('error', (e) => { console.log('WS server error: ', e); });
