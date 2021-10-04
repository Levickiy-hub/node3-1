const http = require("http");
const fs = require('fs');
const url = require('url');
const rpcWS = require('rpc-websockets').Server;

let serverEvent = new rpcWS({ port: 4000, host: 'localhost' });
let errorCounter = 0;
let server = http.createServer(function (request, responce) {

    switch (request.method) {
        case "POST": {
            if (request.url != "/backup") {

                var result = "";
                request.on('data', (data) => {
                    result += data;
                })
                request.on('end', () => {
                    let json = fs.readFileSync('./jsons/StudentList.json');
                    let list = JSON.parse(json);
                    let exist = false;
                    console.log(list);
                    console.log(result);
                    let newStudent = JSON.parse(result);
                    list.forEach(element => {
                        if (element.id == newStudent.id) {
                            errorCounter++;
                            responce.writeHead(200, { "Content-Type": "text/html" })
                            responce.end(JSON.stringify({ error: errorCounter, message: "User already exist" }));
                            exist = true;
                        }
                    });
                    if (!exist) {
                        list.push(newStudent);

                        fs.writeFile("./jsons/StudentList.json", JSON.stringify(list), (error) => {
                            if (error) {
                                console.log(error);
                            }
                            responce.writeHead(200, { "Content-Type": "application/json" });
                            responce.end(null);
                        })
                    }
                })
            } else {
                //backup
                let yyyy = new Date().getFullYear();
                let mm = new Date().getMonth()+1;
                let dd = new Date().getDate();
                let hh = new Date().getHours();
                let ss = new Date().getUTCSeconds();
                if(ss<10){
                    let save= ss;
                    ss='0'+save;
                }
                setTimeout(() => {
                    fs.copyFile('./jsons/StudentList.json', `./copyies/${yyyy}${mm}${dd}${hh}${ss}_StudentList.json`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        responce.writeHead(200, { "Content-Type": "text/html" });
                        responce.end(null);
                    });
                }
                    , 2000)
                return;
            }
            break;
        }
        case "GET": {
            if (request.url == "/backup"){
                fs.readdir('./copyies/',(error,files)=>{
                    if(error){
                        console.log(error);
                    }
                    responce.writeHead(200, { "Content-Type": "application/json" });
                    responce.end(JSON.stringify(files));
                })
            }
            else {
                let array = [];
                decodeURI(url.parse(request.url, true).pathname).split('/').forEach(element => {
                    if (element != '') {
                        array.push(element);
                    }
                })
                if (array.length == 1) {
                    let json = fs.readFileSync("./jsons/StudentList.json");
                    let list = JSON.parse(json);
                    console.log(list);
                    list.forEach(element => {
                        if (element.id == array[0]) {
                            responce.writeHead(200, { "Content-Type": "application/json" });
                            responce.end(JSON.stringify(element));
                            return;
                        }
                    });
                    //error
                    let id = array[0];
                    errorCounter++;
                    responce.writeHead(200, { "Content-Type": "text/html" });
                    responce.end(JSON.stringify({ error: errorCounter, message: `Student is not found with id=${id}` }));
                } else {
                    let json = fs.readFileSync("./jsons/StudentList.json");
                    responce.writeHead(200, { "Content-Type": "application/json" });
                    responce.end(json);
                }
            }
            break;
        }
        case "PUT": {

            var result = "";
            request.on('data', (data) => {
                result += data;
            })

            request.on('end', () => {
                let json = fs.readFileSync("./jsons/StudentList.json");
                let list = JSON.parse(json);
                let updateUser = JSON.parse(result);
                let exist = false;
                list.forEach((element, index) => {
                    if (element.id == updateUser.id) {
                        exist = true;
                        responce.writeHead(200, { "Content-Type": "application/json" });
                        list[index] = updateUser;
                        fs.writeFile("./jsons/StudentList.json", JSON.stringify(list), (error) => {
                            if (error) {
                                console.log(error);
                            }
                            responce.writeHead(200, { "Content-Type": "application/json" });
                            responce.end(JSON.stringify(updateUser));
                        })
                        return;
                    }
                });
                if (!exist) {
                    errorCounter++;
                    responce.writeHead(200, { "Content-Type": "text/html" });
                    responce.end(JSON.stringify({ error: errorCounter, message: `Student is not found with id=${updateUser.id}` }));
                }
            })

            break;
        }
        case "DELETE": {
            if (request.url.includes('backup')) {
                let array = [];
                decodeURI(url.parse(request.url, true).pathname).split('/').forEach(element => {
                    if (element != '') {
                        array.push(element);
                    }
                })
                console.log(array.length);
                if(array.length==2){
                    let date = array[1];
                    fs.readdir('./copyies/',(error,files)=>{
                        if(error){
                            console.log(error);
                        }
                        files.forEach((file,index)=>{
                            let newName = file.slice(0,8);
                            if(newName<date){
                                fs.unlinkSync(`./copyies/${file}`);
                            }
                        })
                    })
                }
                responce.writeHead(200, { "Content-Type": "text/html" });
                responce.end(null);
            } else {
                let array = [];
                decodeURI(url.parse(request.url, true).pathname).split('/').forEach(element => {
                    if (element != '') {
                        array.push(element);
                    }
                })
                if (array.length == 1) {
                    let json = fs.readFileSync("./jsons/StudentList.json");
                    let list = JSON.parse(json);
                    let exist = false;
                    list.forEach((elem, index) => {
                        if (elem.id == array[0]) {
                            exist = true;
                            list.splice(index, 1);
                            fs.writeFile("./jsons/StudentList.json", JSON.stringify(list), (error) => {
                                if (error) {
                                    console.log(error);
                                }
                                responce.writeHead(200, { "Content-Type": "application/json" });
                                responce.end(JSON.stringify(elem));
                            });
                            return;
                        }
                    })
                    if (!exist) {
                        errorCounter++;
                        let id = array[0];
                        responce.writeHead(200, { "Content-Type": "text/html" });
                        responce.end(JSON.stringify({ error: errorCounter, message: `Student is not found with id=${id}` }));
                    }
                }
            }
            break;
        }
    }
}).listen(3000);

serverEvent.event('fileChange');

fs.watch('./copyies/',(event,filename)=>{
    console.log(event, filename);
    serverEvent.emit('fileChange', { event: event,file:filename });
})
