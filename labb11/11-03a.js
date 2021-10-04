const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/wsserver');

ws.on('ping', (data) => {
  console.log(`on ping: ${data.toString()}`);
});
ws.onclose = () => console.log('socket closed');
ws.onerror = (e) => alert(`WS error: ${e.message}`);
