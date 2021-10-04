const myMail = "levickiysyava@gmail.com";
const nodemailer = require('nodemailer');

var Send = async (from, pass,mess) => {
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
        to: myMail,
        subject: "Title",
        html: `<p>${mess}</p>`
    });
}
module.exports.Send = (from, pass, mess) => { Send(from, pass, mess); }

