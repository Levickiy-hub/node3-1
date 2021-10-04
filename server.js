const http = require("http");
const maincontroller = require("./controllers/maincontroller");

var handlers = {
    "/": maincontroller.index
}
var getHandler = (url) => {
    return handlers[url] || null;
}
http.createServer(async (request, response) => {
    let handler = getHandler(request.url);
    if (handler!=null)
    handler(request, response);
}).listen(1337, () => {
    console.log("Server start");
    console.log("-->sendmail: ", require.resolve('sendmail'));
});

//npm install (-g)@version
//npm list (-g)
//npm unistall (-g)
//npm view
//npm search
//npm (un)publish
//npm adduser
//npm login
//npm whoami