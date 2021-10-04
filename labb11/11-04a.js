const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5000');
ws.on('open', ()=>{
    ws.on('message', (data)=>{
        data =  JSON.parse(data);
        console.log('on message: ', data);
    })

    setInterval(()=>{ws.send(JSON.stringify({x: '1234', t: new Date().toISOString()}))}, 3000)
})
ws.on('error', (e)=>{console.log('wss server error', e)})