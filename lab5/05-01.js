const lab4 = require('./04-01');
const database = require('./db');
const data = new database.DB();
data.on('COMMIT', () => {
    data.commit();
})
function statistics() {
    console.log('req: ' + lab4.request + ' ' + 'comm: ' + database.commit);
}
let isSecondCall = false;
let isParam = true;
let timeout;
let interval;
let start
let finish;
process.stdin.setEncoding('utf-8');
process.stdin.unref();
process.stdin.on('readable', () => {
    let param = '';
    let sec = '';
    let chunk;
    while ((chunk = process.stdin.read()) != null){
        for (let i = 0; chunk[i] !== '\n'; i++){
            if (isParam && chunk[i] !== ' '){
                param += chunk[i];
            }
            if (!isParam){
                if (Number.isInteger(Number.parseInt(chunk[i]))){
                    sec += chunk[i];
                }
                else{
                    console.log('---')
                }
            }
            if (chunk[i] === ' '){
                isParam = false;
            }
        }
        isParam = true;
        let x = Number.parseInt(sec);
        switch (param){
            case 'sd':{
                if (!isNaN(x)) {
                    if (isSecondCall) {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            lab4.server.close();
                         //   console.log('server is stopped')
                        }, x*1000);
                        isSecondCall = false;
                        timeout.unref();
                    }
                    if (!isSecondCall) {
                        timeout = setTimeout(() => {
                            lab4.server.close();
                            console.log('server is stopped')
                        }, x*1000);
                        isSecondCall = true;
                        timeout.unref();
                    }
                }
                if (isNaN(x)){
                    clearTimeout(timeout);
                }
                break;
            }
            case 'sc':{
                if (!isNaN(x)){
                    interval = setInterval(data.commit,(x*1000));
                    interval.unref();
                }
                if (isNaN(x)){
                    clearInterval(interval);
                }
                break;
            }
            case 'ss':{
                if (!isNaN(x)){
                    start = new Date();
                    interval1 = setInterval(statistics, (x*1000));
                    interval1.unref();

                }
                if (isNaN(x)){
                    finish = new Date();
                    let startStr = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' +  start.getSeconds() + '.' + start.getMilliseconds();
                    let finishStr = finish.getFullYear() + '-' + (finish.getMonth() + 1) + '-' + finish.getDate() + ' ' + finish.getHours() + ':' + start.getMinutes() + ':' + finish.getSeconds() + '.' + finish.getMilliseconds();
                    lab4.result = JSON.stringify({start: startStr, finish: finishStr, request: lab4.request, commit: database.commit});
                    clearInterval(interval1);
                }
                break;
            }
            default:
                console.log('Incorrect command or param ' + chunk);
                break;
        }
}
})