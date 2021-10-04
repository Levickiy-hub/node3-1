const fs = require("fs");
const indexpath = './view/index.html';
const nodemailer = require("nodemailer");

var send = async (from, pass,to, mess) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: from,
            pass: pass
        }
    });
    let info = await transporter.sendMail({
        from: from,
        to: to,
        subject: "Title",
        html: `<p>${mess}</p>`
    });
}
var index = async (request, response) => {
    if (request.method == "GET") {
        response.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' });
        fs.readFile(indexpath, (err, data) => {
            if (err) {
                response.end('Not Found');
            }
            else {
                response.end(data);
            }
        });
    }
    else if(request.method == "POST") {
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
       
        request.on('end', function () {
            let obj = JSON.parse(body);
            send(obj.from, obj.pass,obj.to,obj.mess);
            response.end(JSON.stringify(obj));
        });
    }
}

module.exports.index = index;
