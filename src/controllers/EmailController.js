const connection = require('../database/connection');
const nodemailer = require('nodemailer');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async sendEmailContact (req, res) {
        const response = {...responseModel}

        const { 
            emailTo,
            emailFrom,
            emailMessage,
            emailUserName
        } = req.body;

        console.log("DADOS DA MENSAGEM:", req.body);

        var transport = nodemailer.createTransport({
            host: "mail.benedetifinancas.com.br",
            port: 465,
            auth: {
                user: "contato@benedetifinancas.com.br",
                pass: "R@quel10"
            }
        });

        // var transport = nodemailer.createTransport({
        //     host: "smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "c0c4a2c1bc4cf7",
        //         pass: "e17744eae26cf5"
        //     }
        // });

        var message = {
            from: emailFrom,
            to: emailTo,
            subject: emailUserName,
            text: emailMessage,
            html: "<p>" + emailMessage + "</p>"
        };

        transport.sendMail(message)

        return res.json(response);
    },


}